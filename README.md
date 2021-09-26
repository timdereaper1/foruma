# Foruma

A pretty simple web application for users to create forums and talk about ideas. Built using NextJS and firebase.

## Development

We use yarn to install all our packages. It's highly recommended to yarn than npm for consistency. To start development, run the following command to start the next js server

```bash
yarn dev
```

For the backend, you would need to install mongodb on your computer and create a .env file with the url for the mongodb. See .env.example. To run the backend server, use the following command

```bash
yarn dev-server
```

**Important** DO NOT combine code for both app and server folders, because they both run on different platforms. There will be more restructuring done to enable you to share code between both platforms, but for now, keep each platform separate from each other.
