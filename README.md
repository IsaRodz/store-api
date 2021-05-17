# Store API

### The purpose of this project is to test out my skills.

I built a REST API with NodeJS and Express. The API delivers products and categories from a MySQL database. This server also provides a public folder for static files for the client application.

If you want to see this app in production you can visit this link https://fathomless-shore-99532.herokuapp.com/ and have a look.

The client app is built with Vanilla Javascript, which means I didn't use any framwork as React, Vue, Angular or any other similar.

## How to run this app?

-   Clone this repo
-   Navigate to he project folder and run `npm install`
-   Create a `.env` file for your environment variables
-   Inside the `.env` file you must add this variables
    `DB_HOST DB_USER DB_PASSWORD DB_NAME`

    You can also add a `PORT` variable but this is optional

-   Now inside the project folder run the `npm run start` command and you should see in the console the message `Server running on port 3000`
