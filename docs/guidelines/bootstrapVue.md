---
title: BootstrapVue
---

# BootstrapVue

Welcome to the BootstrapVue Guidelines! This document outlines the best practices and conventions for using BootstrapVue intergrated with SCSS effectively at MSML. By adhering to these principles, we can ensure consistency, maintainability, and efficiency in our development process.

## Key Principles
- BootstrapVue extends Bootstrap with Vue components and utilities.
- Use BootstrapVue Components and Directives.
- Rely on BootstrapVue for core UI elements like buttons, forms, alerts, and modals.
- Using BootstrapVue ensures consistency across the application and minimizes the need for custom solutions.

### Centralize SCSS Customizations
Keep all variable overrides and global styles consolidated in a single SCSS file to ensure maintainability. At MSML, the preferred file for this purpose is typically `core/variables.scss`.

Avoid scattering customizations across multiple files unless scoped to specific modules.

### Minimize Direct CSS Overrides
Prefer Bootstrap’s utility classes (.d-flex, .p-3, etc.) or SCSS mixins for customization.
Use direct CSS sparingly, primarily for global layouts or styles that cannot be addressed by utilities.

```html
<template>
 <b-card
    title="Card Title"
    class="mb-2"
    body-class="py-5"
    border-variant="light"
    bg-variant="primary"
  >
    <b-card-text>
      Some quick example text to build on the card title and make up the bulk of the card's content.
    </b-card-text>

    <b-button href="/go" variant="primary">Go somewhere</b-button>
  </b-card>
</template>
```

#### Leverage Theming Features
Use SCSS variables to create a consistent color scheme and typography throughout the application.


```css
$theme-colors: (
  "primary": #0d6efd,
  "secondary": #6c757d,
  "success": #198754,
  "info": #0dcaf0,
  "warning": #ffc107,
  "danger": #dc3545,
  "light": #f8f9fa,
  "dark": #212529
);
```

#### Integration
Import the custom SCSS file into the project entry point or the app.scss file:
```css
// Variables
@import 'core/variables';
```


## File structure
- Use one import file that can be used as a webpack mix (For example app.scss)
- Files that are imported into that single file should have a _underscore before the filename to indicate this is a imported file
- Structure the files in these folders: 'Core' 'Layouts' 'Elements' 'Components'

### Core
Use this folder only for styling that will be used globally. Here's an example:

```css
@import 'core/animation';
@import 'core/base';
@import 'core/typography';
@import 'core/variables';
```

Example css from the base file:

```css
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  position: relative;
  font-family: $font-family-base;
  font-size: $base-font-size;
  color: $base-font-color;
  background: $body-bg;
  text-rendering: optimizeLegibility;
  overflow-x: hidden;
}
```

### Layouts
These files are meant for styling for specific layout. The auth screens (Login, register) for example usually have a different layout.

```css
// Layouts
@import 'layouts/app';
@import 'layouts/auth';
```

### Elements
Elements are predefined components in the framework, so for example in Bootstrap the components could be buttons or cards. Here you can place overrides for those components if needed. The name of the file should correspond with the components name from the framework.

**Good**
```css
// Elements
@import 'elements/buttons';
@import 'elements/cards';
@import 'elements/dropdowns';
```

**Bad**
```css
// Elements
@import 'elements/primary-button';
@import 'elements/home-card';
@import 'elements/table-dropdown';
```

### Components
This folder is used to store the styling for components that are not predefined by the framework, these are custom made or could be imported outside of the css framework. Examples of those components are footers, headers, multiselect, etc.

```css
// Components
@import 'components/footer';
@import 'components/sidebar';
@import 'components/multiselect';
@import 'components/v-datepicker';
```
