# ✨ Beauty Headless Store — Skincare Premium

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Linter](https://img.shields.io/badge/ESLint-Clean-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)]()
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-Passing-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)]()

Uma aplicação de e-commerce **headless premium** inspirada no mercado de cosméticos e skincare natural de alto luxo. Este projeto foi estruturado utilizando as melhores práticas do ecossistema Next.js moderno e simula uma integração corporativa realista com o **Sitecore XM Cloud**.

---

## 🏛️ Destaques de Engenharia (Para Recrutadores)

Este projeto foi construído para demonstrar maturidade técnica, arquitetura de software limpa e boas práticas exigidas em ambientes enterprise:

- **Padrão de Mapeamento de Layouts (Component Mapper):** Desacoplamento total de dados e exibição. O layout das páginas é definido no JSON do CMS; o Next.js lê essa estrutura em tempo de execução e monta a tela dinamicamente.
- **Performance Otimizada (Hibridismo RSC/RCC):**
  - **React Server Components (RSC) por padrão:** Todos os componentes do CMS (`Hero`, `ProductGrid`, `PromoBanner`, `RichTextBlock`) e páginas buscam dados e renderizam no servidor, enviando zero Javascript desnecessário ao navegador.
  - **Client Components (RCC) Isolados:** Componentes folha de interatividade (como o [`ProductFavoriteButton`](file:///Users/joaomelo/Desktop/sitecore_next/components/ProductFavoriteButton.tsx)) usam `"use client"` estritamente onde necessário para gerenciar estados.
- **Next.js 15+ Ready:** Uso das novas convenções assíncronas para parâmetros dinâmicos de rotas (`await params` em páginas e Route Handlers).
- **Tipagem TypeScript Estrita:** **0 ocorrências de `any`** na camada do CMS. Todo o payload e mapeadores são fortemente tipados usando interfaces dinâmicas e registros genéricos.
- **Esteira CI/CD Integrada:** Pipeline configurado via GitHub Actions que roda a cada Push/PR bloqueando códigos que não passem no linter, formatação ou build de produção.

---

## 🗺️ Fluxo Arquitetural da Aplicação

```txt
┌────────────────┐     Lança atualizações de layout e textos
│   Marketing    │ ───────────────────────────────────────────────┐
└────────────────┘                                                │
        │                                                         ▼
        ▼                                               ┌──────────────────┐
┌────────────────┐     Simula o banco do CMS            │  data/sitecore/  │
│  Sitecore CMS  │ ───────────────────────────────────► │    (JSONs)       │
└────────────────┘                                      └──────────────────┘
                                                                  │
                                                                  ▼
┌────────────────┐     Route Handlers locais            ┌──────────────────┐
│  API Gateway   │ ◄─────────────────────────────────── │   app/api/cms/   │
└────────────────┘                                      └──────────────────┘
        │
        │ Consome via fetch() assíncrono (no servidor)
        ▼
┌────────────────┐     Resolve componentName p/ React   ┌──────────────────┐
│  Next.js RSC   │ ───────────────────────────────────► │ componentMapper  │
└────────────────┘                                      └──────────────────┘
        │
        │ Renderiza HTML limpo com CSS Modules
        ▼
┌────────────────┐     Hidrata elementos interativos    ┌──────────────────┐
│    Browser     │ ◄─────────────────────────────────── │   Client Comp.   │
└────────────────┘                                      └──────────────────┘
```

---

## 📂 O que foi implementado?

Toda a estrutura foi construída de forma modular seguindo a risca a especificação corporativa:

### ⚡ Integração & Dados (Backend Simulado)

- **`data/sitecore/`:** Mock de banco de dados estruturado do CMS.
  - [`home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json): Layout da home page com componentes encadeados.
  - [`products.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/products.json): Catálogo completo de cosméticos.
  - [`campaigns.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/campaigns.json): Configuração de landing pages promocionais.
- **`app/api/cms/`:** API Routes (Route Handlers) servindo dados de forma dinâmica e com suporte a tratativa de erros e endpoints de busca por slug:
  - [`home/route.ts`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/home/route.ts) | [`products/route.ts`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/products/route.ts) | [`products/[slug]/route.ts`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/products/[slug]/route.ts) | [`campaigns/[slug]/route.ts`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/campaigns/[slug]/route.ts)

### 🎨 Design & Componentes (Frontend Premium)

- **[`app/globals.css`](file:///Users/joaomelo/Desktop/sitecore_next/app/globals.css):** Design System customizado para skincare de luxo (Verdes intensos, Ouro areia, Alabastro de fundo, sombras suaves, animações integradas e Dark Mode nativo).
- **`components/ui/`:** Elementos visuais base e navegação.
  - [`Button.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Button.tsx): Botão inteligente com variantes e animações de hover.
  - [`Card.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Card.tsx): Contêiner flexível para alinhamento de grids.
  - [`Header.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Header.tsx) & [`Footer.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Footer.tsx): Cabeçalho e rodapé institucionais com efeito de transparência (glassmorphism).
- **`components/cms/`:** Componentes dinâmicos que interpretam os dados do CMS:
  - [`Hero.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/cms/Hero.tsx) | [`PromoBanner.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/cms/PromoBanner.tsx) | [`RichTextBlock.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/cms/RichTextBlock.tsx) | [`ProductGrid.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/cms/ProductGrid.tsx)
- **[`components/ProductFavoriteButton.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ProductFavoriteButton.tsx):** RCC (Client Component) que implementa um coração de favorito com animação de pulsação e controle de estado reativo.

### 🌐 Páginas (App Router)

- **[`app/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/page.tsx):** Home page que monta o layout dinamicamente via mapper.
- **[`app/products/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/products/page.tsx):** Catálogo de coleção completa.
- **[`app/products/[slug]/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/products/[slug]/page.tsx):** Detalhe de produto com renderização de SEO dinâmico, lista de benefícios e botão de favorito.
- **[`app/campaigns/[slug]/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/campaigns/[slug]/page.tsx):** Landing pages customizadas para campanhas de marketing.

### ⚙️ Integração Contínua (CI/CD)

- **[`.github/workflows/ci.yml`](file:///Users/joaomelo/Desktop/sitecore_next/.github/workflows/ci.yml):** Pipeline de teste e compilação de produção automatizado para o GitHub Actions.

---

## 🚦 Como usar o projeto (Passo a Passo)

Uma das maiores vantagens da arquitetura do Next.js é que **você não precisa iniciar múltiplos servidores separados**. As rotas de API (_Route Handlers_) rodam no mesmo processo do frontend!

### 1. Preparação Inicial

Abra o terminal, navegue até a pasta do projeto e instale os pacotes:

```bash
npm install
```

### 2. Iniciar a Aplicação (Servidor Unificado)

Rode o comando abaixo para iniciar o servidor de desenvolvimento local:

```bash
npm run dev
```

O Next.js iniciará o servidor em: **[http://localhost:3000](http://localhost:3000)**.
Nesse momento, a API (Backend) e as páginas (Frontend) já estarão rodando de forma unificada!

---

## 🧪 Como Testar e Impressionar?

Para ver o dinamismo do **Headless CMS** em ação, siga estes passos rápidos:

### Passo 1: Acesse a Loja

Abra o site no seu navegador ([http://localhost:3000](http://localhost:3000)). Você verá a home elegante com o título `"A Revolução do Skincare Natural"`.

### Passo 2: Altere os dados no CMS simulado

Abra o arquivo [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json). Altere o campo `"title"` do Hero:

```diff
-"value": "A Revolução do Skincare Natural"
+"value": "Sua Pele Radiante, Naturalmente ✨"
```

Salve o arquivo.

### Passo 3: Observe a mudança instantânea!

Volte para o navegador e recarregue a página (ou veja o Live Reload). O título mudará de imediato.
**Explicação Técnica:** O Next.js detecta a mudança de dados, faz um novo fetch em tempo de execução no Route Handler e gera a estrutura HTML atualizada no servidor (Server Component), sem carregar um único byte de Javascript de edição no cliente.

---

## 📚 Documentação Adicional do Projeto

No diretório [`docs/`](file:///Users/joaomelo/Desktop/sitecore_next/docs/), criamos guias avançados detalhados para consolidar o aprendizado:

1.  **[Arquitetura Headless (architecture.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/architecture.md):** Um aprofundamento sobre como os payloads do Sitecore se traduzem em renderização de servidor e hidratação cliente no navegador.
2.  **[Git Workflow Corporativo (git-workflow.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/git-workflow.md):** O manual definitivo com comandos reais de Git, práticas de branches e resolução de conflitos de merge.
3.  **[Exercícios de Manutenção (maintenance-exercises.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/maintenance-exercises.md):** 7 desafios práticos propostos para você expandir o e-commerce, debugar bugs de TypeScript e experimentar novos componentes.
