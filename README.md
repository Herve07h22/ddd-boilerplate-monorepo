# Mono-repo boilerplate project

Thanks to the yarn workspaces, we can now keep the core business logic away from the frameworks.

In this sample project, we have 2 workspaces :

- packages/core : it contains the core domain, without any dependency to any framework
- apps/webserver : a regular NextJS project that can use the core domain as a library

Available scripts :

- `yarn test` runs all the tests for each workspace
- `yarn dev` starts the NextJS project in dev mode
