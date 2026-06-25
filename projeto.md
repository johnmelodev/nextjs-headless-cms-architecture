Crie um projeto completo chamado `beauty-headless-store`.

Objetivo:
Simular uma empresa real usando Next.js, React, TypeScript, arquitetura headless CMS, Sitecore XM Cloud, Git workflow empresarial e CI/CD.

Contexto:
O projeto deve representar uma marca de cosméticos/skincare parecida com uma empresa enterprise. O marketing edita conteúdo no CMS, o frontend consome esse conteúdo via API e renderiza páginas com Next.js.

Importante:
Eu não tenho acesso real ao Sitecore XM Cloud, então crie uma simulação realista de Sitecore usando arquivos JSON e API routes. O código deve ser organizado para que no futuro eu pudesse trocar o fake CMS por uma API GraphQL real do Sitecore Experience Edge.

Stack obrigatória:

- Next.js com App Router
- React
- TypeScript
- Server Components
- Client Components
- API Routes ou Route Handlers
- ESLint
- Prettier
- GitHub Actions
- Estrutura de Pull Request
- Deploy-ready para Vercel

Crie esta estrutura:

```txt
beauty-headless-store/
  app/
    page.tsx
    products/page.tsx
    products/[slug]/page.tsx
    campaigns/[slug]/page.tsx
    api/cms/home/route.ts
    api/cms/products/route.ts
    api/cms/products/[slug]/route.ts
    api/cms/campaigns/[slug]/route.ts

  components/
    cms/Hero.tsx
    cms/ProductGrid.tsx
    cms/RichTextBlock.tsx
    cms/PromoBanner.tsx
    ui/Button.tsx
    ui/Card.tsx
    ProductFavoriteButton.tsx

  lib/
    cms/
      fetchHomePage.ts
      fetchProducts.ts
      fetchProductBySlug.ts
      fetchCampaignBySlug.ts
      types.ts
      componentMapper.tsx

  data/
    sitecore/
      home.json
      products.json
      campaigns.json

  docs/
    architecture.md
    git-workflow.md
    interview-questions.md
    maintenance-exercises.md

  .github/
    workflows/
      ci.yml

  .env.example
  package.json
  README.md
```

Funcionalidades:

1. Home page

- Deve buscar dados do fake CMS usando Server Component.
- Deve renderizar blocos vindos do CMS:
  - Hero
  - PromoBanner
  - ProductGrid
  - RichTextBlock

2. Products page

- Deve listar produtos vindos do fake CMS.
- Cada produto deve ter:
  - id
  - slug
  - name
  - category
  - price
  - image
  - description
  - benefits

3. Product detail page

- Rota dinâmica `/products/[slug]`.
- Deve buscar produto pelo slug.
- Deve usar Server Component para buscar dados.
- Deve usar Client Component para botão de “favorite”, usando `useState`.

4. Campaign page

- Rota dinâmica `/campaigns/[slug]`.
- Simular landing page de campanha editável pelo marketing.

5. Fake Sitecore CMS

- Os arquivos JSON devem simular conteúdo vindo do Sitecore XM Cloud.
- Use uma estrutura parecida com conteúdo headless:
  - fields
  - componentName
  - renderingId
  - datasource
  - items

6. Component Mapper

- Crie um mapper que recebe `componentName` do JSON e decide qual componente React renderizar.
- Exemplo:
  - "Hero" renderiza `<Hero />`
  - "ProductGrid" renderiza `<ProductGrid />`
  - "PromoBanner" renderiza `<PromoBanner />`

7. Server vs Client Components

- Explique com comentários no código:
  - Server Component busca dados.
  - Client Component usa interação, estado, eventos e hooks.

- Coloque `"use client"` apenas onde for necessário.

8. API

- Crie route handlers simulando endpoints do CMS:
  - `/api/cms/home`
  - `/api/cms/products`
  - `/api/cms/products/[slug]`
  - `/api/cms/campaigns/[slug]`

9. CI/CD
   Crie `.github/workflows/ci.yml` com etapas:

- checkout
- setup node
- npm ci
- npm run lint
- npm run type-check
- npm run build

10. Scripts no package.json
    Inclua:

- dev
- build
- start
- lint
- type-check
- format

11. Documentação
    Crie `docs/architecture.md` explicando visualmente:

```txt
Marketing
↓
Sitecore XM Cloud fake JSON
↓
API
↓
Next.js Server Components
↓
React Components
↓
Browser
```

Crie `docs/git-workflow.md` explicando:

- criar branch
- fazer alteração
- commit
- push
- abrir Pull Request
- receber review do chefe
- corrigir comentários
- merge na main
- pipeline roda
- deploy na Vercel

Inclua comandos reais:

```bash
git checkout -b feature/update-home-hero
git status
git add .
git commit -m "Update home hero content"
git push origin feature/update-home-hero
```

Explique também:

- pull
- fetch
- merge
- rebase
- stash
- revert
- reset
- conflito de merge

12. Exercícios de manutenção
    Crie `docs/maintenance-exercises.md` com exercícios práticos:

Exercício 1:
Alterar o texto do hero no CMS fake sem mexer no componente.

Exercício 2:
Adicionar um novo produto no JSON e ver aparecer na página.

Exercício 3:
Criar novo componente CMS chamado `TestimonialBlock`.

Exercício 4:
Simular bug de TypeScript e ver pipeline falhar.

Exercício 5:
Criar branch, corrigir bug e abrir Pull Request.

Exercício 6:
Simular conflito de merge entre duas branches.

Exercício 7:
Criar variável de ambiente `NEXT_PUBLIC_SITE_NAME`.

13. README
    O README deve explicar:

- o que o projeto simula
- como instalar
- como rodar
- como funciona o fake CMS
- como funciona o fluxo empresarial
- como funciona CI/CD
- como isso se relaciona com Sitecore XM Cloud real

14. Qualidade do código

- Use TypeScript bem tipado.
- Não use `any` sem necessidade.
- Componentes pequenos e claros.
- Comentários didáticos.
- Código fácil de ler para alguém estudando entrevista.

15. Resultado esperado
    No final, eu quero conseguir:

- rodar `npm install`
- rodar `npm run dev`
- acessar a home
- ver conteúdo vindo do fake CMS
- editar JSON e ver mudanças
- entender Server Component e Client Component
- entender fluxo parecido com Sitecore XM Cloud
- praticar Git empresarial
- ver GitHub Actions simulando CI/CD
