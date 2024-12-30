---
title: Stylesheets
---
# CSS/SASS

This guide outlines best practices and conventions for structuring and writing CSS/SASS in your projects. Following these guidelines ensures maintainability, scalability, and consistency within your codebase.

## File Structure

Organize your SASS files for modularity and maintainability:

- **Single Import File**: Use a single file to import all styles for Webpack Mix or other bundlers.
- **File Prefix**: Prefix imported files with an underscore (`_`) to indicate they are partials.
- **Folder Structure**:
  - `Core`: Global and foundational styles.
  - `Layouts`: Page-specific layout styles.
  - `Elements`: Framework-based components.
  - `Components`: Custom, reusable components.

---

## Core

The `Core` folder contains global styles, such as resets, typography, and variables.

**Example Imports:**

```css
@import 'core/animation';
@import 'core/base';
@import 'core/typography';
@import 'core/variables';
```

**Base File Example:**

```css
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: $font-family-base;
  font-size: $base-font-size;
  color: $base-font-color;
  background: $body-bg;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
```

---

## Layouts

The `Layouts` folder contains styles for specific layouts, such as login or dashboard pages.

**Example Imports:**

```css
@import 'layouts/app';
@import 'layouts/auth';
```

---

## Elements

The `Elements` folder contains styles for framework-based components (e.g., buttons, cards). Override default framework styles here.

**Example Imports:**

```css
@import 'elements/buttons';
@import 'elements/cards';
@import 'elements/dropdowns';
@import 'elements/primary-button';
@import 'elements/home-card';
@import 'elements/table-dropdown';
```

---

## Components

The `Components` folder is for custom, reusable components outside the framework, such as headers, footers, and widgets.

**Example Imports:**

```css
@import 'components/footer';
@import 'components/sidebar';
@import 'components/multiselect';
@import 'components/v-datepicker';
```

---

## Terminology

### Rule Declaration

A rule declaration specifies a selector and its accompanying properties.

**Example:**

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors

Selectors define the elements in the DOM to which styles are applied.

**Examples:**

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties

Properties specify the styles for selected elements.

**Example:**

```css
background: #f1f1f1;
color: #333;
```

---

## CSS Formatting

- Use **soft tabs** (2 spaces).
- Prefer **dashes** over camelCase in class names.
- Avoid **ID selectors**.
- Separate selectors with new lines.
- Add a space before `{`.
- Place closing braces on new lines.
- Add a space after `:` in property declarations.
- Always end declarations with a semicolon.
- Use lowercase shorthand for hex values (e.g., `#fff`).
- Use `0` without units (e.g., `margin: 0;`).

**Examples:**

:::warning
```css
.avatar{
    border-radius:50%;
    border:2px solid white; 
}
```
:::

:::tip
```css
.avatar {
  border-radius: 50%;
  border: 2px solid #fff;
}
```
:::

---

## Comments

- Use `//` for line comments in SASS.
- Avoid end-of-line comments; write comments on separate lines.
- Use comments to explain non-obvious code (e.g., `z-index` values, compatibility hacks).

---

## SASS Guidelines

### Syntax

- Always use `.scss` syntax.
- Organize declarations logically: `@extend`, `@include`, regular styles, pseudo-classes, and nested selectors.

### Ordering of Property Declarations

1. **List `@extend(s)` First**

   ```css
   .weather {
     @extend %module;
   }
   ```

2. **List `@include(s)` Next**

   ```css
   .weather {
     @extend %module;
     @include transition(all .3s ease-out);
   }
   ```

3. **Add Regular Styles**

   ```css
   .weather {
     @extend %module;
     @include transition(all .3s ease-out);
     background: $brand-primary;
   }
   ```

4. **Pseudo-Classes and Pseudo-Elements**

   ```css
   .weather {
     @extend %module;
     @include transition(all .3s ease-out);
     &:hover {
       background: darken($brand-primary, 10%);
     }
   }
   ```

5. **Nested Selectors Last**

   ```css
   .weather {
     @extend %module;
     @include transition(all .3s ease-out);
     > h3 {
       @include transform(rotate(90deg));
       border-bottom: 1px solid #fff;
     }
   }
   ```

### Maximum Nesting

Limit nesting to three levels.

**Example:**

```css
.weather {
  .cities {
    li {
      // Avoid deeper nesting
    }
  }
}
```

### Nest Your Media Queries

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

### Variables

Define reusable variables for colors, fonts, and sizes.

**Example:**

```css
$brand-primary: #f9f9f9;
$brand-secondary: #f91829;
$font-family-base: 'Gilroy', helvetica, arial, sans-serif;
```

### Naming

- Use **dash-cased** variable names.
- Prefix file-local variables with `_` (e.g., `$_local-variable`).

### Colors

Define colors as variables for consistency.

**Example:**

```css
$brand-primary: #f9f9f9;
$brand-secondary: darken($brand-primary, 10%);
```
