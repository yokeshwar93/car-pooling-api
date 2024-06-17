# Choosing the language and Framework

I have used Typescript and Nestjs for this application.Nestjs is a progressive
framework which supports Typescript out of the box.It makes it easy to setup
and start developing web applications as it takes care of most of the boilerplate codes.
It also comes with the flexibility of using either Express or Fastify server out of the box.

# Frameworks used

- Nestjs
- Jest
- Zod
- Express
- Pnpm
- Eslint

# Assumptions

- The max number of seats for creating a car is 6
- The minimum number of seats for creating a car is 1
- The max number of people in a single journey is 6
- The minimum number of people in a single journey is 1
- If we are trying to add a new journey with the same id as any previous journey, it will throw 400 Exception
(This will happen for all journey statuses)

# Scripts

## To install the dependencies

### `pnpm install`

## To start the application in dev mode

### `pnpm run start:dev`

## To start the application in prod 

### `pnpm start`

## To run unit test cases

### `pnpm run test`

#

## API Documentation (OpenAPI Swagger UI)

### http://localhost:9091/api

#

