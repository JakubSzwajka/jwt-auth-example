# JWT Refresh Token Mechanism with React, NestJS, Prisma, and Redux Toolkit Query

This project demonstrates a secure way to handle JSON Web Tokens (JWT) with a refresh token mechanism. It's built using a variety of technologies, including:

- [Nx](https://nx.dev/), a powerful monorepo tool.
- [NestJS](https://nestjs.com/), a versatile Node.js server-side framework.
- [React](https://reactjs.org/), a popular library for building user interfaces.
- [Prisma](https://www.prisma.io/), an open-source database toolkit.
- [Redux Toolkit Query (RTK Query)](https://redux-toolkit.js.org/rtk-query/overview), an advanced data fetching and caching tool.

## Project structure

The project is structured as an Nx monorepo, with separate applications for the API (built with NestJS) and the client (built with React).

The NestJS API connects to a database via Prisma and provides endpoints for user authentication and data retrieval.

The React client uses RTK Query for efficient server state management, including the handling of authentication tokens and user sessions.

## How it works

Users are added to the database through Prisma Studio for simplicity. When a user logs in, the server generates an access token (JWT) and a refresh token. The access token has a short lifespan and is used to authenticate API requests. The refresh token has a longer lifespan and is used to request new access tokens when they expire.

Use `.env.example` and create your own `.env` for configuration.

The refresh token mechanism is implemented as follows:

1. The client sends the user's credentials to the `/api/auth/login` endpoint.
2. The server verifies the credentials and sends back an access token and a refresh token (as http only cookie).
3. The client stores the access token in memory and sends it in the `Authorization` header for subsequent API requests.
4. When the server receives a request with an expired access token, it returns a 401 Unauthorized response.
5. The client, upon receiving a 401 response, sends a request to the `/api/auth/refresh` endpoint along with the refresh token to obtain a new access token.
6. If the refresh token is valid, the server sends back a new access token and the client repeats the original request.

This mechanism keeps the user logged in even if their access token expires, as long as their refresh token is still valid. If the refresh token expires or is otherwise invalid, the user is logged out and must log in again.

## Running the project

- Install dependencies

```
npm install
```

- Create `.env` file and set proper env variables based on `.env.example`.

- Run migrations (inside `packages/api` folder)

```
npx prisma deploy
```

- Run prisma studio and add user (inside `packages/api` folder)

```
npx prisma studio
```

- Start API

```
nx serve api
```

- Start web-client

```
nx serve web-client
```
