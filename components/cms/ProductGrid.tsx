import React from "react";
import Link from "next/link";
import { fetchProducts } from "@/lib/cms/fetchProducts";
import { Card, CardBody } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import ProductFavoriteButton from "@/components/ProductFavoriteButton";
import styles from "./ProductGrid.module.css";

interface ProductGridProps {
  fields: {
    title?: { value: string };
    subtitle?: { value: string };
  };
}

/**
 * SERVER COMPONENT: ProductGrid
 *
 * Por que este é um Server Component?
 * 1. Busca os dados de produtos diretamente no servidor (`await fetchProducts()`).
 * 2. Renderiza a estrutura HTML pesada dos Cards e botões de navegação no servidor.
 * 3. Incorpora com segurança o Client Component interativo `<ProductFavoriteButton />`
 *    no local exato onde a interatividade cliente é necessária (botão de coração).
 */
export default async function ProductGrid({ fields }: ProductGridProps) {
  const title = fields?.title?.value || "Nossos Produtos";
  const subtitle = fields?.subtitle?.value || "";

  // Busca dados diretamente de forma assíncrona no Server Component
  const products = await fetchProducts();

  return (
    <section className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--text-muted)" }}>
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className={styles.grid}>
          {products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <Card>
                <div className={styles.imageWrapper}>
                  {/* Simulador visual de imagem de produto skincare premium */}
                  <div className={styles.placeholderImg}>
                    <span>{product.name}</span>
                  </div>

                  {/* Componente Cliente embutido dentro da árvore do Componente Servidor */}
                  <div className={styles.favButtonWrapper}>
                    <ProductFavoriteButton />
                  </div>
                </div>

                <CardBody>
                  <div className={styles.category}>{product.category}</div>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.price}>
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </div>
                  <div className={styles.footerActions}>
                    <Link href={`/products/${product.slug}`}>
                      <Button variant="outline" className={styles.viewBtn}>
                        Ver Detalhes
                      </Button>
                    </Link>
                  </div>
                </CardBody>
              </Card>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
