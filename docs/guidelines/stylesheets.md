---
title: Stylesheets
---
# Stylesheet Guidelines

This guide outlines best practices for writing and structuring styles in MSML projects, including our use of Mantine and how it integrates into our CSS workflow. Following these guidelines ensures maintainability, scalability, and consistency.

---

## CSS Framework and Mantine Integration

We leverage the [Mantine](https://mantine.dev/) library for styling React components. Mantine provides a robust set of components and utilities to streamline the styling process. Its predefined styles, hooks, and theming capabilities reduce repetitive code and enhance development speed.

### Key Principles:

1. **Prioritize Mantine components and hooks:**
   - Mantine components are optimized for accessibility, responsiveness, and modern design out of the box.
   - Hooks such as `useMantineTheme` or `useStyles` provide dynamic styling solutions that align with the overall theme.
   - Using Mantine ensures consistency across the application and reduces the need for custom solutions.

   **Example:**
   ```tsx
   import { Button } from '@mantine/core';

   export function SubmitButton() {
     return <Button>Submit</Button>;
   }
   ```

2. **Extend Mantine styles using `styles` or `classNames` props for customization:**
   - For light modifications, use the `styles` prop.
   - Use `classNames` when integrating custom CSS from your global or component-specific styles.

3. **Centralize theme overrides to maintain consistency:**
   - Define all theme customizations in a single configuration file.
   - Avoid inline or scattered overrides unless absolutely necessary.

4. **Limit direct CSS usage to global styles or non-Mantine components:**
   - For layouts, typography, or global resets, direct CSS is preferred.
   - Maintain Mantine's default styles for its components whenever possible.

**Example Mantine Customization:**

```tsx
import { Button } from '@mantine/core';

export function CustomButton() {
  return (
    <Button styles={(theme) => ({
      root: {
        backgroundColor: theme.colors.brand[6],
        '&:hover': {
          backgroundColor: theme.colors.brand[7],
        },
      },
    })}>
      Click Me
    </Button>
  );
}
```

---

## File Structure

Organize your styles to differentiate between Mantine-specific customizations and general global styles.

### Folder Structure:

- **`mantine`**: Contains theme configuration and component-specific customizations.
  - `theme.ts`: Centralized theme configuration.
  - `components`: Mantine component-specific customizations, such as buttons or modals.
- **`global`**: Holds CSS files for foundational and global styles.
  - `core`: Resets, typography, and global variables.
  - `layouts`: Layout-specific styles (e.g., `auth.css`, `dashboard.css`).
- **`components`**: Custom styles for non-Mantine components.
  - Reusable elements such as footers or sidebars.
- **`overrides`**: Global overrides for Mantine styles.

---

## Mantine Theme Configuration

Centralize Mantine theme customizations in a `mantine/theme.ts` file.

**Example Theme Setup:**

```ts
import { MantineThemeOverride } from '@mantine/core';

export const theme: MantineThemeOverride = {
  colors: {
    brand: ['#f0f5ff', '#d6e4ff', '#adc6ff', '#85a5ff', '#597ef7', '#2f54eb', '#1d39c4', '#10239e', '#061178', '#030852'],
  },
  primaryColor: 'brand',
  fontFamily: 'Roboto, sans-serif',
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
};
```

### Usage:

```tsx
import { MantineProvider } from '@mantine/core';
import { theme } from './mantine/theme';

function App() {
  return (
    <MantineProvider theme={theme}>
      <YourApp />
    </MantineProvider>
  );
}
```

---

## Global CSS Styles

### Core Styles

Global styles include resets, typography, and utility variables.

**Example Variables:**

```css
:root {
  --font-family-base: 'Roboto', sans-serif;
  --brand-primary: #2f54eb;
  --brand-secondary: #d6e4ff;
}
```

**Base Styles:**

```css
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-family-base);
  font-size: 16px;
  color: #333;
  background-color: #f9f9f9;
}
```

### Naming Convention

- Use **dash-cased** class names for global styles.
- Maintain consistency between Mantine classNames and global CSS styles.

**Example:**

```css
/* Global CSS */
.sidebar {
  background-color: var(--brand-secondary);
  padding: 20px;
}

/* Mantine usage */
<Box className="sidebar">Content</Box>
```

---

## Styling Components with Mantine

### Using the `styles` Prop

Use the `styles` prop to override Mantine component styles dynamically.

**Example:**

```tsx
<Card styles={{
  root: {
    backgroundColor: 'lightblue',
  },
}}>
  Card Content
</Card>
```

### Using the `classNames` Prop

Use `classNames` for applying scoped styles defined in your CSS.

**Example:**

```css
.card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
}
```

```tsx
<Card classNames={{ root: 'card' }}>Card Content</Card>
```

---

## CSS Formatting

Follow standard CSS formatting rules:

1. Use **soft tabs** (2 spaces) to ensure consistent indentation. Soft tabs make it easier to visually parse code and avoid alignment issues across different editors.
2. Separate selectors with new lines to improve readability, especially when multiple selectors target similar styles.
3. Place closing braces on new lines to clearly define block boundaries, reducing errors in nested or lengthy stylesheets.
4. Add a space after `:` in property declarations for cleaner visual separation of property names and values.
5. Always end declarations with a semicolon to avoid accidental errors when adding new properties.

**Example:**

```css
.button {
  border-radius: 4px;
  background: #2f54eb;
  color: #fff;
  padding: 10px 20px;
}
```

These rules enhance maintainability by keeping the codebase clean, readable, and consistent across all contributors.

---

## CSS Guidelines

### Ordering of Property Declarations

Follow the recommended order:

1. **Global resets and variables**
2. Layout styles
3. Regular styles
4. Pseudo-classes
5. Nested selectors

**Example:**

```css
.button {
  background-color: var(--brand-primary);

  &:hover {
    background-color: #1d39c4;
  }

  > span {
    font-size: 14px;
  }
}
```

### Nesting

Limit nesting to **three levels**.

**Example:**

```css
.sidebar {
  .menu {
    li {
      /* Avoid deeper nesting */
    }
  }
}
```

### Media Queries

Nest media queries within the relevant selectors for better context.

**Example:**

```css
.sidebar {
  float: right;
  width: 33.33%;
  @media screen and (min-width: 992px) {
    width: 25%;
  }
}
```

---

### Colors

Define colors as variables for consistency and reuse. Group them logically.

**Example:**

```css
:root {
  --brand-primary: #2f54eb;
  --brand-secondary: lighten(#2f54eb, 20%);
  --neutral-light: #f0f0f0;
  --neutral-dark: #333333;
}
```

Use Mantine's `theme.colors` for application-wide colors.

---

## Comments

### CSS Comments

- Use `/* */` for inline and block CSS comments.
- Avoid end-of-line comments; write comments on separate lines.
- Use comments to explain non-obvious code (e.g., `z-index` values, compatibility hacks).

**Example:**

```css
/* Resetting styles for consistency */
body {
  margin: 0;
  padding: 0;
}

/* Alignment fixes for older browsers */
.grid {
  display: flex;
}
```
