import React from "react";
import { notFound } from "next/navigation";
import { fetchCampaignBySlug } from "@/lib/cms/fetchCampaignBySlug";
import { componentMapper } from "@/lib/cms/componentMapper";
import styles from "./Campaign.module.css";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const campaign = await fetchCampaignBySlug(slug);

  return {
    title: campaign ? `${campaign.title}` : "Campanha Não Encontrada",
    description: campaign?.hero?.subtitle || "Campanhas exclusivas da Beauty Store.",
  };
}

export const dynamic = "force-dynamic";

/**
 * SERVER COMPONENT: CampaignDetailPage (Rota Dinâmica de Campanhas)
 *
 * Por que este é um Server Component?
 * 1. Busca os parâmetros assíncronos da rota (`await params`) e o layout da campanha
 *    diretamente no servidor via `fetchCampaignBySlug`.
 * 2. Trata erros com 404 de forma imediata no servidor chamando `notFound()`.
 * 3. Mapeia e renderiza a lista de blocos do CMS dinamicamente no servidor.
 */
export default async function CampaignDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const campaign = await fetchCampaignBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const heroBg = campaign.hero?.backgroundImage;
  const heroStyle = heroBg ? { backgroundImage: `url(${heroBg})` } : {};

  return (
    <div className="fade-in container">
      <div className={styles.container}>
        <header className={styles.hero} style={heroStyle}>
          <div className={styles.heroOverlay} />
          <div className={`${styles.heroContent} container`}>
            <h1 className={styles.heroTitle}>{campaign.hero?.title}</h1>
            {campaign.hero?.subtitle && (
              <p className={styles.heroSubtitle}>{campaign.hero.subtitle}</p>
            )}
          </div>
        </header>

        <section className={styles.blocksList}>
          {campaign.blocks?.map((block) => componentMapper(block))}
        </section>
      </div>
    </div>
  );
}
