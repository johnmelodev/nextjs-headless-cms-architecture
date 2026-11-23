# ✨ Beauty Headless Store — Premium Skincare E-commerce

[![Next.js](https://img.shields.io/badge/Next.js-15+-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React 19](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Linter](https://img.shields.io/badge/ESLint-Clean-4B32C3?style=for-the-badge&logo=eslint&logoColor=white)]()
[![CI/CD](https://img.shields.io/badge/GitHub%20Actions-Passing-2088FF?style=for-the-badge&logo=githubactions&logoColor=white)]()

A premium headless e-commerce store inspired by high-end organic skincare and cosmetics brands. This application showcases clean architectural patterns, structured layout mappings, and performance-first rendering pipelines by simulating integration with **Sitecore XM Cloud** CMS.

---

## 🏛️ Technical & Architectural Highlights

This project demonstrates modular engineering principles, clean code structure, and development workflows utilized in enterprise-level headless architectures:

- **Layout Mapping Pattern (Component Mapper):** Fully decouples layout data from UI rendering. The arrangement and fields of page elements are driven dynamically by CMS layout configurations resolved at runtime.
- **Hybrid Rendering Architecture (RSC / RCC):**
  - **React Server Components (RSC) by default:** Heavy database fetching and component assembly are performed on the server side (`Hero`, `ProductGrid`, `PromoBanner`, `RichTextBlock`), shipping zero client-side JavaScript overhead.
  - **Isolated Client Components (RCC):** State management and animations (such as the interactive [`ProductFavoriteButton`](file:///Users/joaomelo/Desktop/sitecore_next/components/ProductFavoriteButton.tsx)) are strictly isolated using `"use client"` where dynamic web interactions are required.
- **Next.js 15+ Integration:** Leverages the latest asynchronous paradigms for dynamic routing parameters (`await params` in Page files and Route Handlers).
- **Strict Type Safety:** Fully typed interfaces for CMS configurations and products, with **0 occurrences of `any`** in the core data layers.
- **Automated Quality Pipeline:** Configured GitHub Actions pipeline verifying ESLint formatting, TypeScript compilation, and production builds on every pull request.

---

## 🗺️ Architectural Flow

```txt
┌────────────────┐     Publishes content and layout templates
│   Marketing    │ ───────────────────────────────────────────────┐
└────────────────┘                                                │
        │                                                         ▼
        ▼                                               ┌──────────────────┐
┌────────────────┐     Simulates Sitecore Experience    │  data/sitecore/  │
│  Sitecore CMS  │ ───────────────────────────────────► │    (JSONs)       │
└────────────────┘                                      └──────────────────┘
                                                                  │
                                                                  ▼
┌────────────────┐     Local Route Handlers             ┌──────────────────┐
│  API Gateway   │ ◄─────────────────────────────────── │   app/api/cms/   │
└────────────────┘                                      └──────────────────┘
        │
        │ Fetched asynchronously on the server
        ▼
┌────────────────┐     Maps layout JSON to React components┌──────────────────┐
│  Next.js RSC   │ ───────────────────────────────────► │ componentMapper  │
└────────────────┘                                      └──────────────────┘
        │
        │ Renders semantic HTML with CSS Modules
        ▼
┌────────────────┐     Hydrates isolated dynamic actions│──────────────────┐
│    Browser     │ ◄─────────────────────────────────── │   Client Comp.   │
└────────────────┘                                      └──────────────────┘
```

---

## 📂 Project Structure

```txt
sitecore_next/
  ├── app/                  # Next.js routing and page structures
  │   ├── api/cms/          # Route Handlers simulating Sitecore Experience Edge
  │   ├── campaigns/        # Dynamic promotional landing page routes
  │   ├── products/         # Product catalog and dynamic product pages
  │   ├── globals.css       # Skincare brand design system CSS tokens
  │   └── layout.tsx        # Global shell wrapping Header, Footer, and fonts
  ├── components/           # Reusable React components
  │   ├── cms/              # Dynamic content blocks mapped from the CMS
  │   ├── ui/               # Core design items (Buttons, Cards, Header, Footer)
  │   └── ProductFavoriteButton.tsx # Heart toggle Client Component (with interactive state)
  ├── data/sitecore/        # Simulated Headless CMS JSON database
  ├── docs/                 # Detailed architectural and workflow documents
  │   ├── architecture.md   # Headless layout mapping analysis
  │   ├── git-workflow.md   # Standard branch flow and git guides
  │   └── maintenance-exercises.md # Practical developer training exercises
  ├── .github/workflows/    # CI/CD GitHub Actions workflow setups
  ├── .env.example          # Template environment configurations
  ├── .prettierrc           # Prettier code formatting rules
  └── README.md             # This file
```

---

## 🚦 Getting Started

The Next.js App Router architecture packages both frontend pages and serverless API endpoints into a single process. There is **no need to run separate backend servers**.

### 1. Installation

Install project dependencies using the lockfile:

```bash
npm install
```

### 2. Run the Unified Development Server

Launch the local development environment:

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser to access the store.

---

## 🧪 Testing the Headless CMS Engine

To see the dynamic layout resolution in action:

1.  Navigate to the store home page. The hero block displays `"A Revolução do Skincare Natural"`.
2.  Open [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json) in your code editor.
3.  Modify the title value inside the `"Hero"` component:
    ```diff
    -"value": "A Revolução do Skincare Natural"
    +"value": "Sua Pele Radiante, Naturalmente ✨"
    ```
4.  Save the file and refresh your browser. The title updates instantly.
    - **Behind the Scenes:** The server component dynamically pulls layout updates from the API route at request time, outputting fresh static HTML markup without loading editing engines or heavy client-side Javascript.

---

## 📚 Technical Documentation

Explore the following guides inside the `docs/` folder for deeper insights into the project codebase:

1.  **[Headless Architecture (architecture.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/architecture.md):** Deep dive into the data orchestration flow and rendering pipeline.
2.  **[Git Workflow Guidelines (git-workflow.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/git-workflow.md):** Command guides and branch structures.
3.  **[Developer Maintenance Exercises (maintenance-exercises.md)](file:///Users/joaomelo/Desktop/sitecore_next/docs/maintenance-exercises.md):** Hands-on code extension challenges simulating new CMS component integration, TypeScript debugging, and environment variables configurations.
