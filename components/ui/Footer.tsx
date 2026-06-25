import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Beauty Store";

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.brandInfo}>
            <h3>{siteName}</h3>
            <p>
              Simulação de e-commerce headless integrada com Sitecore XM Cloud. Criado para
              demonstrar arquiteturas Next.js modernas e padrões corporativos de alto nível.
            </p>
          </div>
          <div className={styles.linkGroup}>
            <h4>Navegação</h4>
            <ul className={styles.links}>
              <li>
                <Link href="/" className={styles.link}>
                  Início
                </Link>
              </li>
              <li>
                <Link href="/products" className={styles.link}>
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/campaigns/skin-care-routine" className={styles.link}>
                  Campanha
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.linkGroup}>
            <h4>Legal</h4>
            <ul className={styles.links}>
              <li>
                <a href="#" className={styles.link}>
                  Termos de Uso
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Privacidade
                </a>
              </li>
              <li>
                <a href="#" className={styles.link}>
                  Suporte
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} {siteName}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
