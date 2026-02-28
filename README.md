<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A RESTful API backend for a developer-matching platform, built with <a href="http://nodejs.org" target="_blank">Node.js</a> and NestJS.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

**DevMatch** is a RESTful API backend for a developer-matching platform. It provides user authentication and developer profile management, exposing a clean JSON API with auto-generated Swagger documentation.

### What it does

- **Authentication** — User registration and login with hashed passwords (bcrypt) and JWT Bearer tokens (7-day expiry).
- **Profiles** — Full CRUD for developer profiles, with protected write operations (create, update, delete) requiring a valid JWT.
- **Standardized responses** — All responses are wrapped in a consistent envelope (`{ data, statusCode, timestamp, path }`).
- **Error handling** — Global exception filter maps both NestJS HTTP exceptions and Prisma ORM errors (duplicate key → 409, not found → 404, etc.) to clean JSON error responses.
- **API docs** — Swagger UI available at `http://localhost:3000/api`.

### API endpoints

| Method   | Path             | Auth required | Description                    |
| -------- | ---------------- | :-----------: | ------------------------------ |
| `POST`   | `/auth/register` |      No       | Create a new user account      |
| `POST`   | `/auth/login`    |      No       | Authenticate and receive a JWT |
| `GET`    | `/profiles`      |      No       | List all profiles              |
| `GET`    | `/profiles/:id`  |      No       | Get a single profile by UUID   |
| `POST`   | `/profiles`      |      Yes      | Create a new developer profile |
| `PUT`    | `/profiles/:id`  |      Yes      | Update a profile               |
| `DELETE` | `/profiles/:id`  |      Yes      | Delete a profile               |

### Tech stack

| Layer            | Technology                                                   |
| ---------------- | ------------------------------------------------------------ |
| Framework        | [NestJS](https://nestjs.com) v11 (on Express)                |
| Language         | TypeScript 5 (ES2023 / NodeNext modules)                     |
| Database         | PostgreSQL                                                   |
| ORM              | [Prisma](https://www.prisma.io) v7 with `@prisma/adapter-pg` |
| Auth             | JWT via `@nestjs/jwt` + Passport.js (`passport-jwt`)         |
| Password hashing | bcryptjs (12 salt rounds)                                    |
| Validation       | `class-validator` + `class-transformer`                      |
| API docs         | `@nestjs/swagger` + Swagger UI                               |
| Package manager  | pnpm                                                         |
| Testing          | Jest + Supertest                                             |

### Architecture

The `profiles` module follows a **Clean/Layered Architecture**:

- **Domain layer** (`domain/`) — Pure TypeScript entity and abstract repository interface; zero framework or ORM dependencies.
- **Application layer** (`application/`) — Use-case service that depends only on the abstract interface.
- **Infrastructure layer** (`infrastructure/`) — Prisma repository implementation and NestJS HTTP controller. Only this layer knows about Prisma.

The repository is injected via a `Symbol` token (`PROFILE_REPOSITORY`), keeping the application layer fully decoupled from the ORM.

## Project setup

### Prerequisites

- Node.js (ES2023 compatible)
- pnpm
- A running PostgreSQL instance (default: `localhost:5432`)

### Environment variables

Create a `.env` file in the project root with the following variables:

```bash
DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
JWT_SECRET="your-secret-key"
```

### Install dependencies

```bash
$ pnpm install
```

### Database setup

Run Prisma migrations to create the database schema and generate the client:

```bash
# Apply migrations
$ pnpm exec prisma migrate dev

# Generate Prisma client
$ pnpm run generate
```

## Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

The API will be available at `http://localhost:3000`.  
Swagger UI will be available at `http://localhost:3000/api`.

## Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
