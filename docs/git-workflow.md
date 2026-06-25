# Git Workflow Guidelines

This document details the version control (Git) guidelines adopted for the development and maintenance of the `beauty-headless-store` project. It highlights branching standards, conventions, and merge practices used in professional collaborative engineering teams.

---

## 🔄 Branching & Integration Flow

```txt
  [ branch: main ] ────► Create feature/xxxx ────► Implement changes
                                                        │
  [ Merge to main ] ◄── Approved ◄── Pull Request & Review ◄── Commit & Push
```

---

## 🛠️ Command Manual

### 1. Starting a Task (Feature Branch)
Always develop features or fixes inside dedicated task branches created from the latest version of the default branch:
```bash
# Ensure you are on the main branch and pull updates
git checkout main
git pull origin main

# Create and switch to your feature branch
git checkout -b feature/update-home-hero
```

### 2. Inspecting Working Tree Status
Review modified, deleted, and untracked files:
```bash
git status
```

### 3. Committing Changes
Stage your changes and write clear, semantic commit messages following the Conventional Commits specification:
```bash
# Stage modified files
git add .

# Commit with a semantic message
git commit -m "feat: update home hero title and visual CTA styles"
```

### 4. Pushing Changes to Remote
Upload your branch to GitHub to make it available for review:
```bash
git push origin feature/update-home-hero
```

### 5. Pull Requests (PR) & Code Review
*   Open the repository on GitHub.
*   Click **Compare & pull request** next to your branch.
*   Describe your changes and link relevant issue tickets.
*   Assign reviewers to evaluate your code.
*   If adjustments are requested, implement them locally on the same branch, commit, and push. The pull request updates automatically.

### 6. CI/CD Pipeline & Deployment
*   Opening or pushing to a PR triggers the **GitHub Actions** validation pipeline (defined in `.github/workflows/ci.yml`).
*   The workflow runs formatting audits, TypeScript checks, and production builds.
*   Once tests pass and the branch is merged into `main`, the code deploys automatically to production.

---

## 📖 Git Operations Reference

*   **`git pull`:** Fetches changes from the remote repository and merges them into the current local branch. (Equivalent to running `git fetch` followed by `git merge`).
*   **`git fetch`:** Downloads metadata and references from remote branches without changing local working files.
*   **`git merge`:** Combines the commit history of a target branch into your active branch, generating a merge commit.
*   **`git rebase`:** Re-applies local commits on top of the latest commit of another branch. This keeps the commit graph clean and linear by avoiding merge commits.
*   **`git stash`:** Temporarily stores modified, tracked files to clean your working directory. Useful when switching branches quickly without committing incomplete work:
    *   Save: `git stash`
    *   Restore: `git stash pop`
*   **`git revert`:** Creates a new commit that applies the exact inverse changes of a past commit, safely undoing changes on shared remote branches.
*   **`git reset`:** Point your active branch to a past commit. **Caution:** Running `git reset --hard` discards all uncommitted modifications.

---

## ⚡ Handling Merge Conflicts

Conflicts occur when different branches modify the same lines of the same file. To resolve conflicts locally:
1.  Pull the latest changes from the default branch into your active feature branch:
    ```bash
    git checkout feature/update-home-hero
    git merge main
    # OR using rebase (recommended for linear histories)
    git rebase main
    ```
2.  Git will flag conflicts with inline markers in affected files:
    ```txt
    <<<<<<< HEAD
    Sérum Iluminador Vitamina C 15%
    =======
    Super Sérum de Vitamina C Pura
    >>>>>>> main
    ```
3.  Open the files in your editor, choose which changes to keep, and remove the Git markers (`<<<<<<<`, `=======`, `>>>>>>>`).
4.  Commit the resolved changes:
    ```bash
    git add resolved-file.tsx
    # If resolving after a merge:
    git commit -m "merge: resolve merge conflicts with main"
    # If resolving after a rebase:
    git rebase --continue
    ```
5.  Push the updated branch.
