# Arquitetura do Projeto: Headless Store & Sitecore

Este documento explica o fluxo de dados e a arquitetura de renderização do projeto `beauty-headless-store`. A estrutura foi projetada para emular fielmente uma infraestrutura corporativa real usando o **Sitecore XM Cloud** e o **Next.js**.

---

## 🗺 Fluxo de Dados e Renderização

O diagrama a seguir ilustra a jornada da informação, desde a edição feita pela equipe de Marketing no CMS até a exibição final de elementos interativos no navegador do cliente:

```txt
[ Marketing ]  --> Cria/Edita layouts e conteúdos no Sitecore XM Cloud
     ↓
[ Sitecore XM Cloud ]  --> Exporta dados estruturados via APIs JSON (Experience Edge)
     ↓
[ API Route Handlers ] --> Recebe requisições e serve os payloads JSON simulados
     ↓
[ Next.js Server Components ] --> Consome a API, processa e faz o fetch assíncrono
     ↓
[ Component Mapper ]   --> Traduz nomes de componentes JSON em componentes React
     ↓
[ React Components ]   --> Estiliza e estrutura os blocos (Hero, PromoBanner, etc.)
     ↓
[ Browser / Cliente ]  --> Renderiza o HTML estático e hidrata botões interativos (Client)
```

---

## 🏛 Componentes da Arquitetura

### 1. Camada de Dados (Fake Headless CMS)

Em um ambiente corporativo real, a equipe de marketing utiliza o editor visual do **Sitecore Pages** para arrastar e soltar componentes e editar textos. O Sitecore armazena essa árvore de componentes e a disponibiliza de forma desacoplada (_headless_) através do **Sitecore Experience Edge**, que é uma API GraphQL de altíssima performance hospedada na CDN.

- **Como simulamos:** Criamos arquivos locais em [`data/sitecore/`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/) (`home.json`, `products.json` e `campaigns.json`) contendo campos de texto, caminhos de imagens e definições de posicionamento que mimetizam exatamente os payloads GraphQL/REST do Experience Edge.

### 2. Camada de Integração de API (Route Handlers)

O frontend Next.js não lê arquivos locais diretamente em produção; ele consome endpoints HTTP para buscar o conteúdo mais recente.

- **Como simulamos:** Criamos rotas de API em [`app/api/cms/`](file:///Users/joaomelo/Desktop/sitecore_next/app/api/cms/) utilizando os Route Handlers do Next.js. Elas leem os arquivos JSON de forma dinâmica a cada requisição, emulando atrasos de rede e cabeçalhos HTTP normais de uma API externa.

### 3. Component Mapper (Mapeador de Layout)

Este é o coração de qualquer aplicação integrada com Sitecore. O Sitecore envia um JSON contendo uma lista de objetos com a propriedade `componentName`. O frontend precisa decidir dinamicamente qual componente React instanciar para cada item.

- **Como implementamos:** Criamos a função [`componentMapper`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/componentMapper.tsx) em `lib/cms/`. Ela recebe um objeto componente vindo do CMS, avalia seu tipo (ex: `"Hero"`, `"ProductGrid"`) e retorna o componente React correspondente passando os campos de dados como props.

### 4. Server vs. Client Components (Arquitetura Híbrida)

Adotamos o padrão recomendado do Next.js App Router para otimização de performance SEO:

- **Server Components (Padrão):** Buscam dados no CMS, processam regras de negócio e geram o HTML estático no servidor. Reduzem drasticamente o tamanho do pacote Javascript enviado ao navegador.
- **Client Components (Focalizados):** Usam a diretiva `"use client"` e são utilizados estritamente onde há interatividade em tempo real, manipulação de estado do React (`useState`, `useEffect`) ou eventos de clique do usuário (como o [`ProductFavoriteButton.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/components/ProductFavoriteButton.tsx)).

---

## 🚀 Como migrar para um Sitecore XM Cloud Real

Para substituir a simulação local por uma instância real do Sitecore XM Cloud no futuro:

1.  **Instalar o SDK oficial:** Adicione as dependências `@sitecore-jss/sitecore-jss-nextjs`.
2.  **Configurar o endpoint GraphQL:** Altere a função de busca em [`lib/cms/`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/) para fazer queries GraphQL apontando para o endpoint do _Experience Edge_ usando o token de API correspondente.
3.  **Mapear componentes com o SDK:** Substitua o mapeador simples por `<Placeholder name="headless-main" rendering={props.rendering} />` fornecido pelo SDK do Sitecore JSS, vinculando os mesmos componentes visuais criados na Fase 3.
