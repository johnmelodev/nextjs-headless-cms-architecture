import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import styles from "./Hero.module.css";

interface HeroProps {
  fields: {
    title?: { value: string };
    subtitle?: { value: string };
    backgroundImage?: { value: string };
    ctaText?: { value: string };
    ctaLink?: { value: string };
  };
}

/**
 * SERVER COMPONENT: Hero
 *
 * Por que este é um Server Component?
 * 1. Não gerencia estado interativo nem usa hooks (como useState/useEffect).
 * 2. Renderiza de forma estática os dados vindos diretamente do CMS.
 * 3. Mantém o código JS menor no navegador, já que renderiza inteiramente no servidor.
 */
export default function Hero({ fields }: HeroProps) {
  const title = fields?.title?.value || "Beauty Headless Store";
  const subtitle = fields?.subtitle?.value || "";
  const bgImage = fields?.backgroundImage?.value;
  const ctaText = fields?.ctaText?.value;
  const ctaLink = fields?.ctaLink?.value;

  const sectionStyle = bgImage ? { backgroundImage: `url(${bgImage})` } : {};

  return (
    <section
      className={`${styles.heroSection} ${!bgImage ? styles.heroDefaultBg : ""}`}
      style={sectionStyle}
    >
      <div className={styles.overlay} />
      <div className="container">
        <div className={styles.content}>
          <h1>{title}</h1>
          {subtitle && <p>{subtitle}</p>}
          {ctaText && ctaLink && (
            <Link href={ctaLink} className={styles.cta}>
              <Button variant="secondary">{ctaText}</Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
