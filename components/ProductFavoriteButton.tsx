"use client";

/**
 * CLIENT COMPONENT: ProductFavoriteButton
 *
 * Por que este é um Client Component?
 * 1. Usa interação direta do usuário (evento de clique onClick).
 * 2. Gerencia estado interno usando React hooks (useState).
 * 3. Depende de animações e transições acionadas pelo estado no navegador.
 *
 * Diretiva "use client": Informa ao Next.js que este arquivo e suas dependências devem
 * ser enviados ao navegador para execução interativa (hidratação).
 */

import React, { useState } from "react";
import styles from "./ProductFavoriteButton.module.css";

export default function ProductFavoriteButton() {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <button
      className={`${styles.favBtn} ${isFavorited ? styles.favorited : ""}`}
      onClick={(e) => {
        // Evita que o clique no botão de favoritar navegue para o produto caso esteja dentro de um Card clicável
        e.preventDefault();
        e.stopPropagation();
        setIsFavorited(!isFavorited);
      }}
      aria-label={isFavorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
    >
      <svg className={styles.icon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </button>
  );
}
