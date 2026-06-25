import React from "react";
import { fetchHomePage } from "@/lib/cms/fetchHomePage";
import { componentMapper } from "@/lib/cms/componentMapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Início | Beauty Headless Store",
  description: "Explore a revolução do skincare natural com fórmulas limpas e tecnologia de ponta.",
};

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeData = await fetchHomePage();

  if (!homeData) {
    return (
      <div className="container" style={{ padding: "80px 0", textAlign: "center" }}>
        <h1 style={{ marginBottom: "16px" }}>Erro ao carregar dados</h1>
        <p style={{ color: "var(--text-muted)" }}>
          Não foi possível conectar ao CMS simulado. Certifique-se de que a API local está ativa.
        </p>
      </div>
    );
  }

  const mainComponents = homeData.placeholders["headless-main"] || [];

  return (
    <div className="fade-in container">
      {mainComponents.map((component) => componentMapper(component))}
    </div>
  );
}
