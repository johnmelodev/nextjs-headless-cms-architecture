import React from "react";
import { CMSComponent } from "./types";
import Hero from "@/components/cms/Hero";
import PromoBanner from "@/components/cms/PromoBanner";
import ProductGrid from "@/components/cms/ProductGrid";
import RichTextBlock from "@/components/cms/RichTextBlock";

/**
 * Component Mapper
 * Maps CMS componentName to the corresponding React components.
 * Decides which React component to render dynamically based on raw layout JSON.
 */
export function componentMapper(component: CMSComponent) {
  const { componentName, renderingId, fields } = component;

  switch (componentName) {
    case "Hero":
      return <Hero key={renderingId} fields={fields} />;
    case "PromoBanner":
      return <PromoBanner key={renderingId} fields={fields} />;
    case "ProductGrid":
      // Nota: ProductGrid é um componente assíncrono (Server Component).
      // No React 19/Next.js App Router, componentes assíncronos podem ser renderizados diretamente no JSX.
      return <ProductGrid key={renderingId} fields={fields} />;
    case "RichTextBlock":
      return <RichTextBlock key={renderingId} fields={fields} />;
    default:
      return (
        <div key={renderingId} style={{ padding: "12px", color: "var(--error)" }}>
          Componente desconhecido: {componentName} (Rendering ID: {renderingId})
        </div>
      );
  }
}
