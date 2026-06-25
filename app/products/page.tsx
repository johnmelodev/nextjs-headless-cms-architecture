import React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/cms/fetchProducts";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ProductFavoriteButton from "@/components/ProductFavoriteButton";
import styles from "./ProductsPage.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Produtos",
  description:
    "Descubra nossa linha de cosméticos e skincare. Fórmulas limpas e clinicamente aprovadas.",
};

export const dynamic = "force-dynamic";

/**
 * SERVER COMPONENT: ProductsPage
 *
 * Por que este é um Server Component?
 * 1. Busca a lista completa de produtos diretamente de forma assíncrona.
 * 2. Renderiza de forma estática no servidor os cards do catálogo.
 * 3. Envia o botão cliente de favoritos de forma embutida e isolada.
 */
export default async function ProductsPage() {
  const products = await fetchProducts();

  return (
    <div className="fade-in container">
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Nossa Coleção</h1>
          <p className={styles.subtitle}>
            Fórmulas limpas desenvolvidas com ativos dermatológicos de alta eficácia para a saúde da
            sua pele.
          </p>
        </header>

        <div className={styles.metaInfo}>
          <span className={styles.productCount}>
            Exibindo {products.length} {products.length === 1 ? "produto" : "produtos"}
          </span>
        </div>

        {products.length === 0 ? (
          <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "48px 0" }}>
            Nenhum produto cadastrado no catálogo.
          </p>
        ) : (
          <div className={styles.grid}>
            {products.map((product) => (
              <div key={product.id}>
                <Card>
                  <div className={styles.imageWrapper}>
                    <div className={styles.placeholderImg}>
                      <span>{product.name}</span>
                    </div>
                    <div className={styles.favBtn}>
                      <ProductFavoriteButton />
                    </div>
                  </div>
                  <CardBody>
                    <div className={styles.category}>{product.category}</div>
                    <h2 className={styles.productName}>{product.name}</h2>
                    <div className={styles.price}>
                      {product.price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" className={styles.viewBtn}>
                        Ver Detalhes
                      </Button>
                    </Link>
                  </CardBody>
                </Card>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
