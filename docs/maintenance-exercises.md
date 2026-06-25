# Exercícios Práticos de Manutenção

Estes exercícios simulam tarefas reais de desenvolvimento, engenharia e gerenciamento de conteúdo no projeto `beauty-headless-store`. Execute-os para testar seus conhecimentos e fixar o fluxo de desenvolvimento headless.

---

## 📝 Exercício 1: Alterar conteúdo do CMS (Sem mexer no código!)

**Objetivo:** Alterar a mensagem principal da Home Page através do arquivo de dados, simulando uma alteração feita pelo marketing no Sitecore XM Cloud.

- **Instruções:**
  1.  Abra o arquivo [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json).
  2.  Localize o bloco com `componentName: "Hero"`.
  3.  Altere o valor do campo `"title"` de `"A Revolução do Skincare Natural"` para `"Sua Pele Radiante, Naturalmente"`.
  4.  Salve o arquivo.
  5.  Abra a Home no navegador e veja que a mensagem mudou instantaneamente sem alterar nenhuma linha nos arquivos React de `components/cms/Hero.tsx`.

---

## 📝 Exercício 2: Adicionar novo produto ao catálogo

**Objetivo:** Praticar a expansão do banco de dados em formato JSON.

- **Instruções:**
  1.  Abra o arquivo [`data/sitecore/products.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/products.json).
  2.  Adicione um novo objeto produto no final do array:
      ```json
      {
        "id": "prod-5",
        "slug": "mascara-argila-verde",
        "name": "Máscara de Argila Verde Purificante",
        "category": "Máscaras",
        "price": 74.9,
        "image": "/images/argila-verde.jpg",
        "description": "Máscara mineral que acalma, desintoxica e absorve a oleosidade excessiva da pele sem ressecar.",
        "benefits": [
          "Controle profundo de oleosidade e brilho",
          "Ação calmante e anti-inflamatória natural",
          "Desobstrui poros de forma imediata"
        ]
      }
      ```
  3.  Salve o arquivo.
  4.  Navegue para `/products` e valide se a Máscara aparece na lista e se a contagem exibe "Exibindo 5 produtos".
  5.  Clique em "Ver Detalhes" para abrir `/products/mascara-argila-verde` e conferir a página de detalhes dinâmica.

---

## 📝 Exercício 3: Adicionar um novo bloco CMS (`TestimonialBlock`)

**Objetivo:** Entender a expansão estrutural do Headless CMS criando um componente novo.

- **Instruções:**
  1.  Crie o arquivo `components/cms/TestimonialBlock.tsx` e o estilo em `.module.css`.
  2.  Escreva o componente recebendo campos como `quote` (depoimento) e `author` (autor).
  3.  Registre o novo componente no mapeador em [`lib/cms/componentMapper.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/lib/cms/componentMapper.tsx):
      ```typescript
      case "TestimonialBlock":
        return <TestimonialBlock key={renderingId} fields={fields} />;
      ```
  4.  No arquivo [`data/sitecore/home.json`](file:///Users/joaomelo/Desktop/sitecore_next/data/sitecore/home.json), adicione o novo bloco no array `"headless-main"`:
      ```json
      {
        "componentName": "TestimonialBlock",
        "renderingId": "testimonial-1",
        "fields": {
          "quote": {
            "value": "A melhor marca de skincare que já experimentei. Resultados em uma semana!"
          },
          "author": { "value": "Mariana Santos" }
        }
      }
      ```
  5.  Valide a renderização na Home Page.

---

## 📝 Exercício 4: Simular falha de build e teste automático (Pipeline CI/CD)

**Objetivo:** Ver o pipeline de validação automática agir contra erros de digitação.

- **Instruções:**
  1.  Abra o arquivo [`app/page.tsx`](file:///Users/joaomelo/Desktop/sitecore_next/app/page.tsx).
  2.  Provoque um erro de TypeScript adicionando um import inválido ou tentando chamar uma propriedade inexistente em `homeData` (ex: `console.log(homeData.propriedadeInexistente)`).
  3.  No terminal, execute o comando:
      ```bash
      npm run type-check
      ```
  4.  Veja que o comando falha e acusa o erro exato de compilação. Essa mesma validação automática impedirá que um código com erros seja mesclado no repositório remoto.
  5.  Corrija o erro e rode `npm run type-check` novamente para ver o sucesso.

---

## 📝 Exercício 5: Praticar Git (Criar Branch, Commit e PR)

**Objetivo:** Exercitar o fluxo corporativo de entrega de código.

- **Instruções:**
  1.  Crie uma nova branch local: `git checkout -b feature/minha-correcao`.
  2.  Modifique algo na estilização dos botões em [`components/ui/Button.module.css`](file:///Users/joaomelo/Desktop/sitecore_next/components/ui/Button.module.css).
  3.  Execute `npm run format && npm run lint` para garantir que as alterações cumprem os requisitos de estilo.
  4.  Adicione as modificações e commite:
      ```bash
      git add .
      git commit -m "style: adjust button hover shadow intensity"
      ```
  5.  Retorne para a main e mescle: `git checkout main` -> `git merge feature/minha-correcao`.

---

## 📝 Exercício 6: Simular um Conflito de Merge

**Objetivo:** Aprender a resolver conflitos de arquivos simultâneos.

- **Instruções:**
  1.  Crie a branch `branch-a` e altere o título do Hero no arquivo `data/sitecore/home.json` para `"Título A"`. Commite a alteração.
  2.  Volte para a `main` e crie a branch `branch-b` a partir da main. Altere o mesmo título no mesmo arquivo para `"Título B"`. Commite a alteração.
  3.  Retorne para a `main` e mescle a `branch-a`: `git merge branch-a`. A main agora tem `"Título A"`.
  4.  Tente mesclar a `branch-b` na `main`: `git merge branch-b`.
  5.  O Git acusará um **Merge Conflict**. Abra o arquivo no editor de código, decida qual versão manter, remova as tags de conflito, salve e commite com `git commit` para encerrar o conflito.

---

## 📝 Exercício 7: Configuração de Variável de Ambiente

**Objetivo:** Compreender a configuração de escopos e customizações em tempo de execução.

- **Instruções:**
  1.  Abra o arquivo [`.env.local`](file:///Users/joaomelo/Desktop/sitecore_next/.env.local).
  2.  Altere a variável `NEXT_PUBLIC_SITE_NAME` para `"Glow Skincare Store"`.
  3.  Salve o arquivo.
  4.  Inicie o servidor de desenvolvimento com `npm run dev`.
  5.  Abra o site e observe que o título da aba do navegador, o Header e o Footer agora refletem o novo nome da marca configurado via variável de ambiente de forma dinâmica!
