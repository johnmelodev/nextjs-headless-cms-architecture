# Project Architecture: Headless Store & Sitecore Integration

This document outlines the data orchestration flow and rendering pipeline implemented in the `beauty-headless-store` project. The layout structure is designed to reflect enterprise-level patterns using **Sitecore XM Cloud** and **Next.js**.

---

## 🗺️ Data Orchestration & Rendering Flow

The following diagram illustrates the flow of information, from layout definitions edited by content authors in the CMS to the final dynamic elements rendered in the client's browser:

```txt
[ Marketing / Editors ]  --> Structure layouts and content in Sitecore Pages
          │
          ▼
[ Sitecore XM Cloud ]    --> Export structured layout JSON via CDN-cached APIs (Experience Edge)
          │
          ▼
[ API Route Handlers ]   --> Read local JSON mocks, simulating network responses
          │
          ▼
[ Next.js Server Components ] -> Asynchronously fetch layout structures at request time
          │
          ▼
[ Component Mapper ]     --> Resolve JSON names into corresponding React modules
          │
          ▼
[ React Components ]     --> Assemble and style blocks (Hero, PromoBanner, etc.)
          │
          ▼
[ Browser / Client ]     --> Render semantic HTML and hydrate interactive client behaviors
```

---

## 🏛️ Core Architecture Components

### 1. Data Layer (Simulated Headless CMS)
In a production Sitecore environment, content editors design pages using the visual interface of **Sitecore Pages**. Sitecore stores the layout trees and makes them globally accessible via the **Sitecore Experience Edge**, a high-performance GraphQL API.
*   **Our Simulation:** We store local files in [`data/sitecore/`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/) (`home.json`, `products.json`, and `campaigns.json`) featuring properties like `componentName`, `renderingId`, `datasource`, and `fields`. This mimics the structure of layout payloads delivered by the Experience Edge API.

### 2. Integration API Layer (Route Handlers)
Next.js server-side code queries HTTP endpoints to retrieve content updates.
*   **Our Simulation:** Next.js Route Handlers in [`app/api/cms/`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/) read mock JSONs dynamically on every request, introducing standard HTTP status checks and simulating network APIs.

### 3. Component Mapper (Dynamic Layout Engine)
The headless CMS returns layout payloads containing a list of rendering blocks with a `componentName`. The frontend resolves these strings to instantiate the correct React components dynamically.
*   **Our Implementation:** The [`componentMapper`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/componentMapper.tsx) function inside `lib/cms/` reads the incoming component name (e.g., `"Hero"`, `"ProductGrid"`) and returns the appropriate React component, passing resolved CMS fields as typed properties.

### 4. Hybrid Rendering (Server vs. Client Components)
Following modern Next.js App Router conventions:
*   **Server Components (Default):** Fetch layout data and compile structured CSS/HTML on the server. This reduces client-side bundles and improves Search Engine Optimization (SEO) performance.
*   **Client Components (Isolated):** Marked with the `"use client"` directive. These are strictly used for interactive UI nodes requiring React state hooks or mouse click events (such as [`ProductFavoriteButton.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ProductFavoriteButton.tsx)).

---

## 🚀 Migrating to Production Sitecore Experience Edge

To migrate from the simulated local API to a live Sitecore XM Cloud environment:
1.  **Install the SDK:** Add `@sitecore-jss/sitecore-jss-nextjs` dependencies.
2.  **Redirect Fetch Queries:** Replace utility functions in [`lib/cms/`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/) with GraphQL fetch requests targeting your XM Cloud Experience Edge endpoint.
3.  **Bind Components:** Replace the custom mapper with the official JSS `<Placeholder name="headless-main" rendering={props.rendering} />` components, mapping the visual blocks implemented in this project.
