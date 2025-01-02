---
title: Version Control
description: Writing history
---
# Version Control

Our projects utilize Git, primarily with repositories hosted on GitHub. With a small team and most projects involving fewer than three collaborators, these guidelines ensure smooth and efficient version control practices.

---

## Repo Naming Conventions

### Site Repositories
- **Naming Rule**: Use the main naked domain name as the repository name, lowercased.
- **Examples**:
:::warning[Bad]
  - **Bad**: `https://www.msml.nl`, `www.msml.nl`, `Msml.nl`
:::
:::tip[Good]
  - **Good**: `msml.nl`
:::

### Subdomain Sites
- **Naming Rule**: Include the subdomain in the repository name.
- **Examples**:
:::warning[Bad]
  - **Bad**: `msml.nl-guidelines`
:::
:::tip[Good]
  - **Good**: `guidelines.msml.nl`
:::

### Non-Site Repositories
- **Naming Rule**: Use kebab-case for repository names.
- **Examples**:
:::warning[Bad]
  - **Bad**: `LaravelBackup`, `Spoon`
:::
:::tip[Good]
  - **Good**: `laravel-backup`, `spoon`
:::
---

## Branches

### Key Principle
- The `master` branch must always be **stable** and safe to deploy to production.
- Regularly clean up stale branches.

### Branch Naming Conventions

1. **Feature Branches**
   - Format: `feature/{ticketNumber}-kebab-case-description`
   - Purpose: For implementing features as part of a sprint.
   - **Example**: `feature/MSML-123-add-login-page`

2. **Service Requests**
   - Format: `service/{ticketNumber}-kebab-case-description`
   - Purpose: For handling service requests from the support board.
   - **Example**: `service/MSMLS-456-update-footer-links`

3. **Hotfixes**
   - Format: `hotfix/{ticketNumber}-kebab-case-description`
   - Purpose: For urgent fixes requiring immediate attention.
   - **Example**: `hotfix/MSMLS-789-fix-header-crash`

### Workflow for Branches

- **Feature Branches**: Created for sprint tasks.
  - **Example**: `feature/MSML-234-improve-search-bar`
- **Service Request Branches**: Used for support issues.
  - **Example**: `service/MSMLS-567-correct-spelling-errors`
- **Hotfix Branches**: Address immediate fixes.
  - **Example**: `hotfix/MSMLS-890-patch-security-bug`

**Branching Workflow Steps:**
1. Create a branch from the `master` branch.
2. Make changes related to the task.
3. Push the branch to the remote repository.
4. Create a pull request to merge the branch into `master`.
5. Reviewers validate the changes and approve the pull request.

---

## Release Branches

### Purpose
- Manage production deployments.

### Naming Convention
- Format: `release/v1.0.x`

### Workflow

1. **Creating a Pull Request**
   - From hotfix/service branch to release branch.
   - **Reviewers**: 
     - One senior developer.
     - One medior developer from the project team.

2. **Merging and Tagging**
   - Merge pull request.
   - Create a GitHub tag (e.g., `v1.0.1`, `v1.0.2`) to trigger production deployment.

**Examples:**
- `release/v2.0.0`
- `release/v1.5.3`

---

## Pull Requests

### Purpose
- Enable peer reviews.
- Validate merge readiness and commit squashing.
- Serve as future reference points in project history.

### Requirements
- **Mandatory** for all changes.
- Reviewed by at least one medior developer and one additional reviewer.

**Pull Request Tips:**
- Write a clear title and description.
  - **Example**: "Fix: Update cart functionality (MSML-456)"
- Ensure all CI checks pass before merging.
- Tag relevant team members for review.

---

## Merging and Rebasing

### Guidelines

1. **Regular Rebasing**
   - Rebase your branch regularly to reduce merge conflicts.
   - **Example**: `git rebase master`

2. **Merging a Feature Branch**
   - Use: `git merge <branch> --squash`
   - **Example**:
     ```bash
     git checkout master
     git merge feature/MSML-123-add-login-page --squash
     ```

3. **Rebasing on Push Denial**
   - Use: `git rebase`
   - **Example**:
     ```bash
     git fetch origin
     git rebase origin/master
     ```

---

## Commits

### Guidelines
- Use **descriptive commit messages**.
- Include the ticket number in the commit message.
- Write commit messages in **present tense**.

**Good Examples:**
:::tip[Good]
- `MSML-392 Fix cart count on home`
- `MSML-123 Add user profile page`
- `MSMLS-456 Resolve crash on login`
:::

**Bad Examples:**
:::warning[Bad]
- `Fixed issue`
- `Update`
- `Miscellaneous changes`
:::
