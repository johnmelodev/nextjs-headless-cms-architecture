# Fluxo de Trabalho Git Corporativo

Este guia documenta o fluxo de controle de versão (Git) adotado para o desenvolvimento e manutenção do projeto `beauty-headless-store`. Este padrão simula o dia a dia de engenharia de software em projetos corporativos de grande porte.

---

## 🔄 Fluxo de Desenvolvimento Padrão

```txt
  [ branch: main ] ────► Criar branch feature/xxxx ────► Fazer alterações
                                                               ↓
  [ Merge na main ] ◄── Aprovado ◄── Pull Request & Review ◄── Commits & Push
```

---

## 🛠️ Comandos Reais do Dia a Dia

### 1. Iniciar uma nova tarefa (Feature Branch)

Nunca faça alterações diretamente na branch `main`. Sempre crie uma branch específica para sua tarefa a partir da versão mais recente do código:

```bash
# Garantir que está na main e atualizado
git checkout main
git pull origin main

# Criar e acessar a nova branch de funcionalidade
git checkout -b feature/update-home-hero
```

### 2. Verificar o estado do repositório

Acompanhe quais arquivos foram modificados, excluídos ou criados:

```bash
git status
```

### 3. Salvar alterações localmente

Adicione as alterações ao stage e faça um commit com mensagens claras e semânticas:

```bash
# Adicionar todos os arquivos modificados
git add .

# Criar o commit com mensagem explicativa
git commit -m "feat: update home hero title and visual CTA styles"
```

### 4. Enviar a branch para o servidor remoto

Envie suas alterações para o GitHub para disponibilizar o código para revisão:

```bash
git push origin feature/update-home-hero
```

### 5. Abrir Pull Request (PR) e Code Review

- Acesse o repositório no GitHub.
- Clique em **Compare & pull request**.
- Descreva detalhadamente o que foi alterado e por quê.
- Adicione revisores da sua equipe.
- **Aprovação:** Aguarde o _Review_ (aprovação técnica). Se houver comentários pedindo ajustes, faça as alterações diretamente na sua branch, commite e dê `push` novamente. A PR será atualizada de forma automática.

### 6. Integração Contínua (CI/CD) e Deploy

- Ao abrir a PR e a cada push, a esteira do **GitHub Actions** (configurada em `.github/workflows/ci.yml`) será executada.
- Ela irá testar o build do projeto, rodar a checagem de tipos (TypeScript) e rodar o linter (ESLint).
- Se a esteira passar com sucesso e o código for aprovado, o merge na `main` será liberado.
- Ao realizar o merge na `main`, a integração com a **Vercel** detectará a alteração e fará o deploy automático em ambiente de produção.

---

## 📖 Dicionário de Operações Avançadas

- **`git pull`:** Baixa as atualizações do servidor remoto e as mescla imediatamente com a sua branch atual. (Combinação de `git fetch` + `git merge`).
- **`git fetch`:** Apenas baixa as referências e metadados do servidor remoto, permitindo verificar novidades sem alterar suas branches locais de forma imediata.
- **`git merge`:** Mescla o histórico de uma branch em outra (ex: integrar a `feature` na `main`). Cria um commit específico de mesclagem (_merge commit_).
- **`git rebase`:** Reaplica seus commits locais no topo do histórico mais recente de outra branch. Mantém o histórico do Git limpo e linear (sem commits de mesclagem desnecessários).
- **`git stash`:** Guarda temporariamente suas alterações de código ainda não commitadas para "limpar" sua área de trabalho. Útil para trocar de branch rapidamente sem perder trabalho inacabado:
  - Salvar: `git stash`
  - Recuperar: `git stash pop`
- **`git revert`:** Cria um novo commit que desfaz exatamente as alterações de um commit passado. É a forma mais segura de desfazer alterações em branches compartilhadas (remotas), pois não altera o histórico anterior.
- **`git reset`:** Move o ponteiro da sua branch para um commit anterior, removendo alterações do histórico. **Cuidado:** O comando `git reset --hard` apaga de vez as alterações locais não salvas. Deve ser usado com cautela apenas localmente.

---

## ⚡ Tratamento de Conflitos de Merge (_Merge Conflicts_)

Conflitos acontecem quando duas pessoas editam a mesma linha do mesmo arquivo em branches diferentes.
Para resolver localmente:

1.  Puxe as atualizações da branch principal para sua branch de trabalho:
    ```bash
    git checkout feature/update-home-hero
    git merge main
    # OU usando rebase (preferencial em equipes ágeis)
    git rebase main
    ```
2.  O Git pausará e marcará os conflitos no arquivo com marcadores visuais:
    ```txt
    <<<<<<< HEAD
    Sérum Iluminador Vitamina C 15%
    =======
    Super Sérum de Vitamina C Pura
    >>>>>>> main
    ```
3.  Abra o arquivo afetado no seu editor (VS Code, etc.), decida qual versão manter, remova os marcadores (`<<<<<<<`, `=======`, `>>>>>>>`), salve o arquivo.
4.  Conclua o processo:
    ```bash
    git add arquivo-resolvido.tsx
    # Se usou merge:
    git commit -m "merge: resolve merge conflicts with main"
    # Se usou rebase:
    git rebase --continue
    ```
5.  Envie o código corrigido com `git push`. (Se usou rebase em branch remota, pode ser necessário enviar com force-with-lease: `git push --force-with-lease`).
