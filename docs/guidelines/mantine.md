# Mantine

This guide outlines best practices for writing and structuring styles in MSML Mantine projects, including our use of Mantine and how it integrates into our workflow. Following these guidelines ensures maintainability, scalability, and consistency.

## Styling Approaches

Below are the most common ways to style elements in a MSML project.

### Using Component Props from Mantine
   - Utilize Mantine's built-in props for quick and consistent styling.
   - These props allow you to configure padding, margin, colors, and more without writing custom CSS.

   Example:

   ```javascript
   import { Button } from '@mantine/core';

   export function PrimaryButton() {
     return <Button variant="filled" color="indigo">Button</Button>;
   }
   ```

### Using Global Overrides in the `theme.ts`
   - Centralize style customizations for the entire application in the theme file.
   - This ensures consistency and makes it easy to update styles globally.

   Example:

   ```javascript
   import { MantineThemeOverride } from '@mantine/core';

   export const theme: MantineThemeOverride = {
     colors: {
       brand: ['#f0f5ff', '#d6e4ff', '#adc6ff', '#85a5ff', '#597ef7', '#2f54eb', '#1d39c4', '#10239e', '#061178', '#030852'],
     },
     primaryColor: 'brand',
     fontFamily: 'Roboto, sans-serif',
   };
   ```

### Using CSS Modules
   - Define scoped styles in `.module.css` files to avoid conflicts and maintain separation of concerns.
   - CSS Modules are particularly useful for custom components or styles that are not easily handled by Mantine props or theme overrides. 

   Example:

   ```css
   /* layout.module.css */
    .container {
      max-width: 100%;
      @media (min-width: $mantine-breakpoint-lg) {
        max-width: 86rem;
      }
    }
   ```

   ```javascript
   import styles from './Layout.module.css';

   export function CustomLayout() {
     return <Container p={0} className={styles.container}> {children} </Container>;
   }
   ```


## Layout structure with Mantine

Mantine provides several layout components to help structure your UI effectively. Each component is designed for specific use cases. 

When to use each component:
- **Use `Stack`** when you want a simple, vertically-aligned list with spacing.
- **Use `Group`** when you want to align a small set of elements in a row or column with consistent spacing.
- **Use `Flex`** when you need to control the alignment and distribution of items in a flexible container, whether horizontally or vertically.
- **Use `Grid`** when you need a more complex 2D layout with rows and columns.

### Stack
Use the `Stack` component when you need a vertical layout with consistent spacing between elements.

- **Use case**: When you want to stack items vertically, with optional spacing between each item. Perfect for vertical forms, lists, or any components that need to be aligned one after the other.
- **Key Features**:
  - Aligns children in a column (vertical layout).
  - Automatically applies spacing between child elements.
  - Flexibility to control horizontal alignment with the `align` prop.

Example:
  ```jsx
  import { Stack, Button } from '@mantine/core';

  function Demo() {
    return (
      <Stack>
        <Button>First Button</Button>
        <Button>Second Button</Button>
        <Button>Third Button</Button>
      </Stack>
    );
  }
  ```

### Group
Use the `Group` component when you want to align items in a horizontal or vertical row with consistent spacing between them.

- **Use case**: When you need to group related elements together with consistent space between them. Perfect for buttons, inputs, or other inline components.
- **Key Features**:
  - Aligns children in a horizontal (default) or vertical layout.
  - Useful for grouping elements like buttons or icons.
  - Automatically adds space between elements, which can be customized.
  
Example:
  ```jsx
  import { Group, Button } from '@mantine/core';

  function Demo() {
    return (
      <Group spacing="lg">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Group>
    );
  }
  ```

### Flex
Use the `Flex` component when you need a flexible layout, either in rows or columns, with control over the alignment and distribution of items.

- **Use case**: When you need a flexible container that can adjust the size, alignment, or distribution of child elements. Ideal for responsive designs and aligning items in both horizontal and vertical directions.
- **Key Features**:
  - Can be used for both horizontal and vertical layouts.
  - Easily control alignment with `align`, `justify`, and `direction` props.
  - Provides a more flexible approach than `Stack` for both rows and columns.

Example:
  ```jsx
  import { Flex, Button } from '@mantine/core';

  function Demo() {
    return (
      <Flex justify="space-between" align="center">
        <Button>Button 1</Button>
        <Button>Button 2</Button>
        <Button>Button 3</Button>
      </Flex>
    );
  }
  ```

### Grid
Use the `Grid` component when you need a 2D layout with multiple rows and columns, similar to CSS grid.

- **Use case**: When you need to create complex layouts with rows and columns. Ideal for forms, product listings, or any multi-column layout.
- **Key Features**:
  - Divides the container into rows and columns.
  - Can set different column spans with `span` prop.
  - Highly customizable with `cols` (number of columns) and `spacing` between grid items.

Example:
  ```jsx
  import { Grid, Col, Button } from '@mantine/core';

  function Demo() {
    return (
      <Grid>
        <Col span={6}><Button>Button 1</Button></Col>
        <Col span={6}><Button>Button 2</Button></Col>
        <Col span={12}><Button>Button 3</Button></Col>
      </Grid>
    );
  }
  ```
