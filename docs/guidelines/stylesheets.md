---
title: CSS/SCSS
---

# CSS/SCSS

Welcome to the **SCSS/SCSS**! This document outlines the best practices and conventions for using CSS or SCSS at MSML.

## Terminology

### Rule declaration
A "rule declaration" is the name given to a selector (or a group of selectors) with an accompanying group of properties. Here's an example:

```css
.listing {
  font-size: 18px;
  line-height: 1.2;
}
```

### Selectors
In a rule declaration, "selectors" are the bits that determine which elements in the DOM tree will be styled by the defined properties. Selectors can match HTML elements, as well as an element's class, ID, or any of its attributes. Here are some examples of selectors:

```css
.my-element-class {
  /* ... */
}

[aria-hidden] {
  /* ... */
}
```

### Properties
Finally, properties are what give the selected elements of a rule declaration their style. Properties are key-value pairs, and a rule declaration can contain one or more property declarations. Property declarations look like this:

```css
/* some selector */ {
  background: #f1f1f1;
  color: #333;
}
```

## CSS

### Formatting
- Use soft tabs with 2 spaces
- Use dashes over camelCasing in class names
- Do not use ID selectors
- When using multiple selectors in a rule declaration, give each selector its own line
- Put a space before the opening brace in rule declarations
- Place closing braces of declaration blocks on a new line
- In properties, put a space after, but not before, the : character
- Each declaration should appear on its own line for more accurate error reporting
- End all declarations with a semi-colon
- Comma-separated property values should include a space after each comma (e.g., `box-shadow`)
- Don't prefix property values or color parameters with a leading zero (e.g., `.5` instead of `0.5`)
- Lowercase all hex values, e.g., `#f9f9f9`
- Use shorthand hex values where available, e.g., `#fff` instead of `#ffffff`
- Use 0 instead of none to specify that a style has no border
- Avoid specifying units for zero values, e.g., `margin: 0;` instead of `margin: 0px;`

:::warning[Bad]
```css
.avatar{
    border-radius:50%;
    border:2px solid white; }
.no, .nope, .not_good {
    // ...
}
#lol-no {
  // ...
}
```
:::

:::tip[Good]
```css
.avatar {
  border-radius: 50%;
  border: 2px solid #fff;
}

.one,
.selector,
.per-line {
  // ...
}
```
:::

### Comments
- Prefer line comments (`/* Comment */` or `//` in SCSS if the comment shouldn't be included in the css) to block comments
- Prefer comments on their own line. Avoid end-of-line comments
- Write detailed comments for code that isn't self-documenting:
  - Uses of z-index
  - Compatibility or browser-specific hacks

### ID selectors
While it is possible to select elements by ID in CSS, it should generally be considered an anti-pattern. ID selectors introduce an unnecessarily high level of specificity to your rule declarations, and they are not reusable.

### Nest your media queries
The ability to nest media queries in CSS (and SCSS) means:

1. You don't have to re-write the selector somewhere else which can be error prone
2. The rules that you are overriding are very clear and obvious

:::tip[Good]
```css
.sidebar {
  float: right;
  width: 33.33%;
  
  @media screen and (min-width: 992px) {
    width: 25%;
  }
}
```
:::

### Mobile first approach
When writing media queries, follow the mobile-first principle: write base styles for mobile devices first, then progressively enhance for larger screens using `min-width` queries.

:::tip[Good]
```css
.sidebar {
  /* Mobile styles (default) */
  width: 100%;
  padding: 1rem;
  
  /* Desktop (992px and up) */
  @media (min-width: 992px) {
    padding: 3rem;
  }
}
```
:::

:::warning[Bad]
```css
.sidebar {
  /* Desktop styles first */
  width: 33.33%;
  padding: 3rem;
  
  /* Override for tablet */
  @media (max-width: 992px) {
    width: 50%;
    padding: 2rem;
  }
  
  /* Override for mobile */
  @media (max-width: 768px) {
    width: 100%;
    padding: 1rem;
  }
}
```
:::

Benefits of mobile-first approach:
- Creates a natural progression of enhancements as screen size increases
- Results in cleaner, more maintainable code as you build up rather than override
- Often leads to better performance on mobile devices as they don't need to process desktop-first overrides


## SCSS

### Syntax
- Order your regular CSS and @include declarations logically (see below)

### Ordering of property declarations

#### List @extend(s) First
Knowing right off the bat that this class inherits another whole set of rules from elsewhere is good. Another benefit is that overriding styles for that inherited set of rules becomes much easier.

```css
.weather {
  @extend %module;
  /* ... */
}
```

#### List @include(s) Next
Next up is your @includes for mixins and other functions. Again, this is nice to have near the top for reference, but also allows for overrides.

```css
.weather {
  @extend %module;
  @include transition(all .3s ease-out);
  /* ... */
}
```

#### List "Regular" Styles Next
Adding out regular styles after the @extends and @includes allows us to properly override those properties, if needed.

```css
.weather {
  @extend %module;
  @include transition(all .3s ease-out);
  background: $brand-primary;
  /* ... */
}
```

#### Nested Pseudo Classes and Pseudo Elements Next
Pseudo elements and pseudo classes directly related to the element itself so, for that reason, we nest them first before other selectors.

```css
.weather {
  @extend %module;
  @include transition(all .3s ease-out);
  background: $brand-primary;
  
  &:hover {
    background: darken($brand-primary, 10%);
  }
  
  &::before {
    content: "";
    display: block;
  }
  /* ... */
}
```

#### Nested Selectors Last
Nothing goes after the nested stuff. And the same order as above within the nested selector would apply.

```css
.weather {
  @extend %module;
  @include transition(all .3s ease-out);
  background: $brand-primary;
  
  &:hover {
    background: darken($brand-primary, 10%);
  }
  
  &::before {
    content: "";
    display: block;
  }
  
  > h3 {
    @include transform(rotate(90deg));
    border-bottom: 1px solid #fff;
  }
}
```

### Maximum Nesting
Three Levels Deep. If your selector goes beyond three levels, it is likely problematic. It may be too dependent on HTML structure (fragile), overly specific (too powerful), and lacking reusability (not useful).

```css
.weather {
  .cities {
    li {
      // no more!
    }
  }
}
```

### Variables
Use variables for elements that are used multiple times to define the brand and might be subject to change, good examples of those elements are colors, font-family, font-sizes etc.

```CSS
$brand-primary: #f9f9f9;
$brand-secondary: #f91829;
$font-family-base: 'Gilroy', helvetica, arial, sans-serif;
```

#### Naming
Prefer dash-cased variable names (e.g. `$my-variable`) over camelCased or snake_cased variable names. It is acceptable to prefix variable names that are intended to be used only within the same file with an underscore (e.g. `$_my-variable`).

#### Colors
Variablize all colors except perhaps white and black. Chances are a color isn't one-off, and even if you think it is, once it's in a variable you might see uses for it elsewhere. Variations on that color can often be handled by the Sass color functions like `lighten()` and `darken()` – which make updating colors easier.
