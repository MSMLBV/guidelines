---
title: React Native
---

# React Native

Welcome to the **React Native Guidelines**! This document outlines the best practices and conventions for developing React Native applications at MSML.

## Project Structure

Organize files and folders consistently for better maintainability. The structure should match the following:

```
App/
  Assets/
    Fonts/
    Images/
  Components/
    MButton/
      MButton.js
      MButtonStyle.js
    MHeaderIcon/
      MHeaderIcon.js
      MHeaderIconStyle.js
  Containers/
    Dashboard/
      DashboardScreen.js
      DashboardScreenStyle.js
    Home/
      HomeScreen.js
      HomeScreenStyle.js
  Helpers/
    AlertHelper.js
    DateHelper.js
  Navigators/
    AuthStack.js
    HomeStack.js
  Services/
    ApiService.js
    AuthService.js
  Stores/
    RootStore.js
    UserStore.js
  Theme/
    Colors.js
    Fonts.js
  App.js
  ReactotronConfig.js
```

- **Assets**: Images, fonts, and other static resources.
- **Components**: Reusable UI components with individual directories for modular styling.
- **Containers**: Screens or views managing state and lifecycle methods.
- **Helpers**: Utility functions and constants shared across the app.
- **Navigators**: Navigation stacks and configurations.
- **Services**: API calls and external integrations.
- **Stores**: State management using MobX State Tree.
- **Theme**: Application styling, including colors, fonts, and global styles.
- **App.js**: The entry point of the application.
- **ReactotronConfig.js**: Configuration for Reactotron debugging.

## General Principles

- **Consistency**: Follow a consistent structure and style across projects. Use ESLint and Prettier to enforce coding standards, and align with shared code formatting rules defined in the project.
- **Modularity**: Write reusable components and keep business logic separate from UI logic. Use well-documented libraries such as lodash for utility functions.
- **Performance**: Optimize for smooth animations and fast rendering. Avoid unnecessary re-renders by leveraging React.memo and useMemo.
- **Accessibility**: Ensure that applications are usable for everyone. Follow WCAG guidelines and test using screen readers.
- **Scalability**: Design with future growth in mind, ensuring the app can handle increasing complexity and data. Structure stores and services to accommodate additional features seamlessly.
- **Modularity**: Write reusable components and keep business logic separate from UI logic.
- **Performance**: Optimize for smooth animations and fast rendering.
- **Accessibility**: Ensure that applications are usable for everyone.
- **Scalability**: Design with future growth in mind, ensuring the app can handle increasing complexity and data.

## State Management

Use **MobX State Tree (MST)** for state management.

### Best Practices

- Centralize shared states in the `RootStore`.
- Use specific stores (e.g., `UserStore`) for domain-specific logic.
- Keep actions and derived state close to where they are used.

### Additional State Tools

- **Realm**: Use for local data persistence and offline-first functionality when working with structured data.
- **React Query**: Best for handling server-side state and API data fetching with caching capabilities.

## Navigation

Use **React Navigation v6** for managing navigation.

### Guidelines

- Structure navigation stacks to align with the app's flow.
- Prefer tab-based navigation (`TabStack`) for simpler apps and drawer menus (`DrawerStack`) for complex hierarchies.
- Set screen-specific options such as:
  ```jsx
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}
  />
  ```
- Leverage deep linking for external navigation needs.
- Use dynamic params for passing data between screens efficiently.

### Guidelines

- Structure navigation stacks to align with the app's flow.
- Prefer tab-based navigation (`TabStack`) for simpler apps and drawer menus (`DrawerStack`) for complex hierarchies.
- Set screen-specific options such as:
  ```jsx
  <Stack.Screen
    name="Home"
    component={HomeScreen}
    options={{ headerShown: false, cardStyle: { backgroundColor: '#fff' } }}
  />
  ```
- Leverage deep linking for external navigation needs.
- Use dynamic params for passing data between screens efficiently.

## Styling

Use a consistent styling approach.

### Responsive Design

- Use **flexbox** for layout to ensure components adjust fluidly to screen sizes.
- Test designs on multiple devices and orientations (portrait and landscape).
- Utilize libraries like **react-native-responsive-dimensions** or **react-native-size-matters** for scalable dimensions.
- Define breakpoints for screen sizes and apply conditional styling.

### Design tokens

- Using design tokens to be more consistant in styling.
- Design tokens are exported from the Figma project and placed in the following files:
  - `App/Theme/Tokens/colors.json`
    - Colors are defined here and the `Colors.js` is reading the colors from that file and group them in the following groups:
      - background
      - border
      - icons
      - text
  - `App/Theme/Tokens/numbers.json`
    - Numbers are defined here and the `Colors.js` is reading the colors from that file and group them in the following groups:
      - radius
      - spacing
      - icons
  - `App/Theme/Tokens/Fonts.js`
    - Because design tokens for typography are very specific we use the Fonts.js for:
      - The default font sizes.
      - The default typography styling:
        - muted
        - bold
        - semiBold
        - default
        - h1 t/m h5
        - small
      - Default component typography;
        - header
        - input
        - list

:::warning

Only modify the design tokens in consultation with the UI/UX designer.

:::

### Styling rules

- Always define styling in stylesheet components.
- When styling is needed for global components (Navigation, TabStack) then using the `ApplicationStyle.js` create a specific object for this.

:::tip[good]

```js
<View style={Style.container}>
  <Text>MSML</Text>
</View>
```

:::

:::warning[bad]

```js
<View style={{ backgroundColor: 'red', marginleft: 10 }}>
  <Text>MSML</Text>
</View>
```

:::

<!--
### Theming

- Use a centralized theme file to define application-wide colors, typography, and spacing.

### Best Practices

- Use **CSS-in-JS** libraries or **StyleSheet.create** for styles.
- Store global styles in a `Theme` directory.
- Define default spacing, colors, and typography in constants.
- Follow platform-specific design guidelines (Material Design for Android, Human Interface Guidelines for iOS). -->

## Components

### Naming Conventions

- Prefix shared components with `M` (e.g., `MButton`, `MHeader`).
- Use PascalCase for component names.

### Guidelines

- Always use **functional components** instead of class components to leverage hooks and improve readability.

:::tip[good]

```js
export default function MBadge(props) {
  return (
    <View>
      <Text>{props.title}</Text>
    </View>
  );
}
```

:::

:::warning[bad]

```js
export default class MyComponent extends React.Component {
  render() {
    return <Text>{this.props.title}</Text>;
  }
}
```

:::

- Components should be self-contained and reusable.
- Avoid inline styles in components.

## Debugging

Use **Reactotron** for debugging during development.

### Common Debugging Tools

- **Reactotron**: For logging, tracking state changes, and monitoring API requests.

### Common Scenarios

- **Network Failures**: Monitor API calls and responses using Reactotron.
- **Crash Logs**: Check error messages in the console or use Sentry for tracking runtime exceptions.

#### Steps:

1. Install Reactotron.
2. Configure the `ReactotronConfig.js` file.
3. Log debug information using:
   ```javascript
   console.tron.log('Debug Info');
   ```

This document serves as a comprehensive guide for React Native development at MSML. Refer to specific project requirements for any additional conventions or practices.

### Advanced Configurations

- **Nested Navigators**: Use nested navigators for modular app structure:
  ```jsx
  <Stack.Navigator>
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
  ```
- **Custom Transition Animations**: Define custom animations for screen transitions:
  ```jsx
  <Stack.Navigator
    screenOptions={{
      cardStyleInterpolator: ({ current, layouts }) => {
        return {
          cardStyle: {
            transform: [
              {
                translateX: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [layouts.screen.width, 0],
                }),
              },
            ],
          },
        };
      },
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
  ```
- **Conditional Navigation**: Redirect users based on state or props:
  ```jsx
  if (!isLoggedIn) {
    navigation.replace('Login');
  }
  ```
