# Commit Convention

This project uses Semantic Commit Messages to ensure a clean, readable, and structured commit history.

## Format

Each commit message consists of a **header**, an optional **body**, and an optional **footer**.

```text
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

## Types

*   **feat**: A new feature
*   **fix**: A bug fix
*   **docs**: Documentation only changes
*   **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
*   **refactor**: A code change that neither fixes a bug nor adds a feature
*   **perf**: A code change that improves performance
*   **test**: Adding missing or correcting existing tests
*   **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

## Scope

The scope should specify the place of the commit change. For example: `api`, `web`, `ui`, `configs`, `i18n`, `explore`, etc.

## Subject

*   Use the imperative, present tense: "change" not "changed" nor "changes"
*   Don't capitalize first letter
*   No dot (.) at the end
