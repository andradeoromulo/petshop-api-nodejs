# A simple REST API
This is a simple REST API created to manage the suppliers registers of a Petshop. The project is originally from the amazing course [Node.js: Crie uma API REST padronizada e escalável](https://cursos.alura.com.br/course/nodejs-api-rest-padronizada-escalavel) created by [Matheus Hernandes](https://www.linkedin.com/in/onhernandes/). This code was written while I followed the lessons and a I just changed some architectural details.

## Technologies
A little bit of what's inside the project:
- **Node.js** and **Express** to create the server and handle routes, requests and responses.
- **Sequelize** and **MySQL** to persist all the data.
- **Postman** (not really inside the project 😅) for the API testing.

## How to use
Be sure to have a MySQL instance running and to set `./config/default.json` according to a valid user, password and database.
After that, just run on terminal:
```
$ npm install
$ npm start
```

## Endpoints
Endpoints | Description
----------|-------------
GET `/api/suppliers` | List all the suppliers
GET `/api/suppliers/{id}` | Get an specific supplier register
POST `/api/suppliers` | Create a new supplier register
PUT `/api/suppliers/{id}` | Update something in an existing supplier register
DELETE `/api/suppliers/{id}` | Delete an specific supplier register

It's possible to send requests with `Accept` header set to `application/json` or `application/xml`.

## Feedback
I'm a student and I really would like to hear case you have any tips, correction suggestions or comments about any my of projects (🤓).
