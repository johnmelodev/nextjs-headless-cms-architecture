# Practical Maintenance Exercises

These challenges simulate real-world developer tasks, content adjustments, and workflow debugging in headless layouts. Perform these exercises to familiarize yourself with dynamic layout mappings and decoupled architectures.

---

## 📝 Exercise 1: Update CMS Content (Zero Code Changes)
**Goal:** Modify the homepage hero header using only the data layer, simulating layout changes made by content authors in Sitecore XM Cloud.
*   **Instructions:**
    1.  Open the mock layout file in [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json).
    2.  Locate the component entry with `componentName: "Hero"`.
    3.  Change the value of the `"title"` field from `"A Revolução do Skincare Natural"` to `"Sua Pele Radiante, Naturalmente"`.
    4.  Save the file.
    5.  Refresh your browser. The homepage title updates without touching the React code inside `components/cms/Hero.tsx`.

---

## 📝 Exercise 2: Add a Product to the Catalog
**Goal:** Practice extending the data schemas inside structured JSON databases.
*   **Instructions:**
    1.  Open the product database file in [`data/sitecore/products.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/products.json).
    2.  Append a new product object to the end of the array:
        ```json
        {
          "id": "prod-5",
          "slug": "mascara-argila-verde",
          "name": "Máscara de Argila Verde Purificante",
          "category": "Máscaras",
          "price": 74.90,
          "image": "/images/argila-verde.jpg",
          "description": "Máscara mineral que acalma, desintoxica e absorve a oleosidade excessiva da pele sem ressecar.",
          "benefits": [
            "Controle profundo de oleosidade e brilho",
            "Ação calmante e anti-inflamatória natural",
            "Desobstrui poros de forma imediata"
          ]
        }
        ```
    3.  Save the file.
    4.  Open the browser to `/products`. Verify that the new item renders in the grid and that the counter displays "Exibindo 5 produtos".
    5.  Click "Ver Detalhes" to load the dynamic `/products/mascara-argila-verde` page.

---

## 📝 Exercise 3: Implement a New CMS Block (`TestimonialBlock`)
**Goal:** Understand how to register new layout components in the Component Mapper.
*   **Instructions:**
    1.  Create a React component file `components/cms/TestimonialBlock.tsx` and a CSS module `TestimonialBlock.module.css`.
    2.  Structure the component to receive `quote` and `author` fields as props.
    3.  Register the new component inside [`lib/cms/componentMapper.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/componentMapper.tsx):
        ```typescript
        case "TestimonialBlock":
          return <TestimonialBlock key={renderingId} fields={fields} />;
        ```
    4.  Open [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json) and add the component layout block to the `"headless-main"` array:
        ```json
        {
          "componentName": "TestimonialBlock",
          "renderingId": "testimonial-1",
          "fields": {
            "quote": { "value": "A melhor marca de skincare que já experimentei. Resultados em uma semana!" },
            "author": { "value": "Mariana Santos" }
          }
        }
        ```
    5.  Confirm the rendering output on your homepage.

---

## 📝 Exercise 4: Simulating TypeScript Build Failures
**Goal:** Observe how static type checking protects the production build pipeline.
*   **Instructions:**
    1.  Open the file in [`app/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/page.tsx).
    2.  Introduce a type error, such as importing a non-existent function or calling an invalid property on `homeData` (e.g., `console.log(homeData.nonExistent)`).
    3.  Run the type validation command in your terminal:
        ```bash
        npm run type-check
        ```
    4.  Check the output. The build compiler throws errors detailing the line and file. This check blocks faulty commits from merging on remote servers.
    5.  Revert the changes and re-run type checks to verify clean compiling.

---

## 📝 Exercise 5: Basic Branching & Code Review
**Goal:** Practice committing changes on feature branches.
*   **Instructions:**
    1.  Create a branch locally: `git checkout -b feature/button-styles-tweak`.
    2.  Modify the hover shadow values inside [`components/ui/Button.module.css`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Button.module.css).
    3.  Execute `npm run format` and `npm run lint` to verify coding standards.
    4.  Stage and commit modifications:
        ```bash
        git add .
        git commit -m "style: adjust primary button hover shadow intensity"
        ```
    5.  Switch back to the default branch and merge: `git checkout main` followed by `git merge feature/button-styles-tweak`.

---

## 📝 Exercise 6: Conflict Resolution
**Goal:** Practice resolving file conflicts in Git.
*   **Instructions:**
    1.  Create `branch-a` and change the Hero title in `data/sitecore/home.json` to `"Title A"`. Commit the change.
    2.  Switch back to `main`, create `branch-b`, and edit the same title key in the same file to `"Title B"`. Commit the change.
    3.  Switch back to `main` and merge `branch-a`: `git merge branch-a`.
    4.  Attempt to merge `branch-b` into `main`: `git merge branch-b`.
    5.  Git will flag a **Merge Conflict**. Open the file, choose which title to keep, remove the conflict markers, and finalize the commit.

---

## 📝 Exercise 7: Configure Environment Variables
**Goal:** Learn how to customize application parameters via scope environments.
*   **Instructions:**
    1.  Open the file [`.env.local`](file:///Users/joaomelo/Desktop/sitecore_next/.env.local).
    2.  Modify the variable `NEXT_PUBLIC_SITE_NAME` value to `"Glow Skincare Store"`.
    3.  Save the file and run the server:
        ```bash
        npm run dev
        ```
    4.  Observe that the tab title, Header header, and Footer labels updated to display the new name.
