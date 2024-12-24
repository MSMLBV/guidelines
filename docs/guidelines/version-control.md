---
title: Version control
description: Writing history
---

All our projects use Git, mostly with a repository hosted on GitHub. Since we’re a small team, and most projects have less than three people working on them simultaneously, we have structured Git guidelines to ensure smooth collaboration.

## Repo naming conventions

If the repo contains the source code of a site, its name should be the main naked domain name of that site. It should be lowercased.

- Bad: `https://www.msml.nl`, `www.msml.nl`, `Msml.nl`
- Good: `msml.nl`

Sites that are hosted on a subdomain may use that subdomain in their name.

- Bad: `msml.nl-guidelines`
- Good: `guidelines.msml.nl`

If the repo concerns something else, for example a package, its name should be kebab-cased.

- Bad: `LaravelBackup`, `Spoon`
- Good: `laravel-backup`, `spoon`

## Branches

If you're going to remember one thing in this guide, remember this: **Once a project has gone live, the master branch must always be stable**. It should be safe to deploy the master branch to production at all times. All branches are assumed to be active; stale branches should get cleaned up accordingly.

### Branch naming conventions

We follow a structured branch naming convention to align with sprint and support workflows:

- **Feature branches:** `feature/{ticketNumber}-kebab-case-description`
  - Used for implementing features as part of a sprint.
- **Service requests:** `service/{ticketNumber}-kebab-case-description`
  - Used for handling service requests from the support board.
- **Hotfixes:** `hotfix/{ticketNumber}-kebab-case-description`
  - Used for urgent fixes requiring immediate attention.

### Workflow for branches

- The `master` branch is the main branch and is always stable.
- Feature branches, service request branches, and hotfixes are created for specific tasks or issues.
- Pull requests must be created for all changes to be merged into `master`.
  - A minimum of one medior developer from the project team and one additional reviewer must review the pull request.

### Release branches

Release branches are used to manage production deployments. Naming convention:

- `release/v1.0.x`

When a hotfix or service request is ready, a pull request is made to the release branch. The pull request must be reviewed by:

- A senior developer
- A medior developer from the project team

Once the pull request is merged:

- Create a tag in GitHub (e.g., `v1.0.1`, `v1.0.2`) to trigger deployment to the production environment.

### Pull requests

Pull requests are mandatory and can be useful for:

- Ensuring peer reviews
- Validating merge readiness and commit squashing through the interface
- Providing future reference points in project history

### Merging and rebasing

Rebase your branch regularly to reduce the chance of merge conflicts.

- To deploy a feature branch to `master`, use `git merge <branch> --squash`
- If your push is denied, rebase your branch first using `git rebase`

## Commits

Descriptive commit messages are required for all projects. Always include the ticket number and use present tense in commit messages.

- Example: `MSML-392 Fix cart count on home`
