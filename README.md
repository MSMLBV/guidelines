# MSML Code Guidelines

This documentation is built using [Docusaurus](https://docusaurus.io/), a modern static website generator designed for creating and managing professional documentation websites.

### Installation

Install the required dependencies using Yarn:

```
$ yarn
```

### Local Development

To start a local development server:

```
$ yarn start
```

This command will launch a local development server and open a browser window. Any changes made to the source files will reflect live without restarting the server.

### Build

To generate static content for deployment:

```
$ yarn build
```

The generated static files will be placed in the `build` directory, ready to be served using any static content hosting service.

### Deployment

#### Using SSH:

```
$ USE_SSH=true yarn deploy
```

#### Without SSH:

```
$ GIT_USER=<Your GitHub username> yarn deploy
```

If using GitHub Pages for hosting, this command streamlines the process of building the site and deploying it to the `gh-pages` branch.
