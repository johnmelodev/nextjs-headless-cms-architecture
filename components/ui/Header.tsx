import React from "react";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME || "Beauty Store";

  return (
    <header className={styles.header}>
      <div className={`${styles.navContainer} container`}>
        <Link href="/" className={styles.logo}>
          {siteName}
        </Link>
        <nav>
          <ul className={styles.navLinks}>
            <li>
              <Link href="/" className={styles.navLink}>
                Início
              </Link>
            </li>
            <li>
              <Link href="/products" className={styles.navLink}>
                Produtos
              </Link>
            </li>
            <li>
              <Link href="/campaigns/skin-care-routine" className={styles.navLink}>
                Campanha
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
