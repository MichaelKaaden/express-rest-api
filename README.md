# Express REST API Seed

This little project can be used as seed for any REST API
written using TypeScript, Node.js and Express.js.

## Compiling the app

The app is written in TypeScript. You need to compile
the code to JavaScript for it to be able to be run
in Node.js.

To compile the app initially, use `npm run gulp`.
To automatically compile the sources on each 
change, use `npm run watch`.

## Running the app

You need to set the environment variable `NODE_ENV`
to `development`. If you're on any UNIX-like system
like macOS or Linux, this will be done automatically if
you run the app in dev mode using `npm run dev`.

## API Documentation

This seed uses Swagger-UI for documentation purposes. As
[this stackoverflow answer](http://stackoverflow.com/questions/31300756/can-swagger-autogenerate-its-yaml-based-on-existing-express-routes)
suggests, you need to create the swagger.json manually.