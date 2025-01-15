---
title: Version Control
description: Writing history
---
# Version Control

Our projects utilize Git, primarily with repositories hosted on GitHub. With a small team and most projects involving fewer than three collaborators, these guidelines ensure smooth and efficient version control practices.

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

## Branches

### Key Principle
- The `release/vx.x.x` branches must always be **stable** and safe to deploy to production.
- Regularly clean up stale branches. For most repositories, the branch does get deleted automatically after merging.

### Branch Naming Conventions

The naming conventions for branches are quite similar; however, the prefix depends on the issue type:

1. **Story**
   - Format: `feature/{ticketNumber}-kebab-case-description`
   - Purpose: For implementing features as part of a sprint.
   - **Example**: `feature/MSML-123-add-login-page`

2. **Service Request** 
   - Format: `service/{ticketNumber}-kebab-case-description`
   - Purpose: For handling service requests from the support board.
   - **Example**: `service/MSMLS-456-update-footer-links`

3. **Bug**
   - Format: `hotfix/{ticketNumber}-kebab-case-description`
   - Purpose: For handling bugs from the support board.
   - **Example**: `hotfix/MSMLS-789-fix-header-crash`

4. **Maintenance / Security / Access**
   - Format: 
     - If the issue is part of a sprint, follow the `Story` convention.
     - If the issue is on the support board, follow the `Service Request` convention.
   - Purpose: 
     - For framework upgrades, or other maintenance part of the service level agreement.
     - For security incidents requiring code changes.
     - For giving access by code changes, i.e. adding a user to a seeder.
   - **Example**: 
     - `service/MSMLS-999-laravel-12-upgrade` / `feature/MSML-999-laravel-12-upgrade`
     - `service/MSMLS-999-fix-possible-exploit` / `feature/MSML-999-fix-injection-exploit`
     - `service/MSMLS-999-add-john-to-seeder` / `feature/MSML-999-add-john-to-seeder`

Following these conventions automatically means it is **not** possible to create a pull request without a corresponding ticket.
When a pull request is created from a branch that does not follow (the correct) naming conventions, it will be rejected.

### Workflow for Branches

The workflow for branches depends on the issue type:

**Story**
1. Create a branch from the `master` branch.
2. Make changes related to the task.
3. Push the branch to the remote repository.
4. Create a pull request to merge the branch into `master`.
5. Reviewers validate the changes and approve the pull request.

**Service Request**
1. Create a branch from the latest `release/vx.x.x` branch.
2. Make changes related to the task.
3. Push the branch to the remote repository.
4. Create a draft pull request to merge the branch into the latest `release/vx.x.x` branch.
5. Create a pull request to merge the branch into `master`
6. Reviewers validate the changes to `master` and approve the pull request.

**Bug**
1. Create a branch from the latest `release/vx.x.x` branch.
2. Make changes related to the task.
3. Push the branch to the remote repository.
4. Create a pull request to merge the branch into the latest `release/vx.x.x` branch.
5. Reviewers validate the changes and approve the pull request.
6. Do a backmerge by creating a pull request from the latest `release/vx.x.x` branch to the master branch.

**Maintenance / Security / Access**
- If the issue is part of a sprint, follow the `Story` workflow.
- If the issue is on the support board, follow the `Service Request` workflow.

## Release Branches

### Purpose
- Manage production deployments.

### Naming Convention
- Format: `release/v{major}.{minor}.x`
- **Example**: `release/v3.23.x`

### Workflow

1. **Creating a Pull Request**
   - From hotfix/service branch to release branch.
   - **Reviewers**: 
     - One senior developer.
     - One medior developer from the project team.

2. **Merging and Tagging**
   - Merge pull request.
   - Create a GitHub tag (e.g., `v1.0.1`, `v1.0.2`) to trigger production deployment.

## Pull Requests

### Purpose
- Enable peer reviews.
- Validate merge readiness and commit squashing.
- Serve as future reference points in project history.

### Requirements
- **Mandatory** for all changes.
- Reviewed by at least one medior developer and one additional reviewer.

**Pull Request Tips:**
  - Format: `{ticketNumber} A readable and concise description`
   - **Example**: `MSML-456 Update cart functionality`
 - Ensure all CI checks pass.
 - Review it yourself.
 - Tag relevant team members for review.

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
