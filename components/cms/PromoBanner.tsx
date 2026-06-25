import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./PromoBanner.module.css";

interface PromoBannerProps {
  fields: {
    title?: { value: string };
    description?: { value: string };
    badge?: { value: string };
    ctaText?: { value: string };
    ctaLink?: { value: string };
  };
}

/**
 * SERVER COMPONENT: PromoBanner
 *
 * Por que este é um Server Component?
 * 1. Não depende de interatividade client-side direta além do redirecionamento de link nativo.
 * 2. É gerado de forma estática com os dados fornecidos pelo CMS no momento da requisição.
 */
export default function PromoBanner({ fields }: PromoBannerProps) {
  const title = fields?.title?.value;
  const description = fields?.description?.value;
  const badge = fields?.badge?.value;
  const ctaText = fields?.ctaText?.value;
  const ctaLink = fields?.ctaLink?.value;

  if (!title && !description) return null;

  return (
    <section className={styles.banner}>
      <div className={styles.textContainer}>
        {badge && <span className={styles.badge}>{badge}</span>}
        {title && <h2 className={styles.title}>{title}</h2>}
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {ctaText && ctaLink && (
        <Link href={ctaLink}>
          <Button variant="outline">{ctaText}</Button>
        </Link>
      )}
    </section>
  );
}
