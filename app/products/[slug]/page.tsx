import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchProductBySlug } from "@/lib/cms/fetchProductBySlug";
import { Button } from "@/components/ui/Button";
import ProductFavoriteButton from "@/components/ProductFavoriteButton";
import styles from "./ProductDetail.module.css";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  return {
    title: product ? `${product.name}` : "Produto Não Encontrado",
    description: product?.description || "Detalhes do produto skincare premium.",
  };
}

export const dynamic = "force-dynamic";

/**
 * SERVER COMPONENT: ProductDetailPage (Rota Dinâmica)
 *
 * Por que este é um Server Component?
 * 1. Busca os parâmetros assíncronos da rota (`await params`) e o produto específico
 *    diretamente no servidor via `fetchProductBySlug`.
 * 2. Trata erros como 404 de forma imediata no servidor chamando `notFound()`.
 * 3. Renderiza a estrutura da página no servidor e hidrata o botão de favorito cliente isoladamente.
 */
export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await fetchProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="fade-in container">
      <div className={styles.container}>
        <Link href="/products" className={styles.backLink}>
          ← Voltar para Coleção
        </Link>

        <div className={styles.grid}>
          <div className={styles.imageSection}>
            <div className={styles.placeholderImg}>
              <span>{product.name}</span>
            </div>
            <div className={styles.favBtn}>
              <ProductFavoriteButton />
            </div>
          </div>

          <div className={styles.infoSection}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <div className={styles.price}>
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </div>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.benefitsSection}>
              <h2 className={styles.benefitsTitle}>Benefícios do Produto</h2>
              <ul className={styles.benefitsList}>
                {product.benefits.map((benefit, index) => (
                  <li key={index} className={styles.benefitItem}>
                    <span className={styles.benefitIcon}>✓</span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.actions}>
              <Button variant="primary" className={styles.addToCartBtn}>
                Adicionar à Sacola
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
