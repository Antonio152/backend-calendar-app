# Backend Calendar App
<div>
  <img alt="TypeScript" src="https://img.shields.io/badge/-TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="NodeJs" src="https://img.shields.io/badge/NodeJs-45b8d8?style=for-the-badge&logo=NodeJS&logoColor=white" />
  <img alt="JWT" src="https://img.shields.io/badge/JWT-43853d?style=for-the-badge&logo=JWT&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/-Express-15c213?style=for-the-badge&logo=Express&logoColor=white" />
  <img alt="mongoose" src="https://img.shields.io/badge/-mongoose-165fcc?style=for-the-badge&logo=mongoose&logoColor=white" />
</div>

Backend for calendar application

## Installation

1 - Use ```git clone url``` to clone the project into your own repository

2 - Use ```npm i``` to install the packages

3 - Use ```npm run tsc``` to generate the build

4 - Use ```npm run dev``` to run the app on development mode


## Directory

```js
src/
//Controller for authentication and parking space 
├── controllers
    ├──authController.ts
//database, simulation of database using an array
├── database
    ├──database.ts
//custom validations
├── helpers
    ├──isDate.ts
//jwt, generate token for authentication
├── jwt
    ├──jwt.ts
//middleware, check the fields of the request and check if the user is authenticated
├── middleware
    ├──valdiateFields.ts
//Mongoose Models
├──Models
    ├──userModel.ts
//routes, routes of the app
├── routes
    ├──auth.ts
    ├──events.ts
```
## Routes
| Base path: http://localhost:5000
### Auth
| New user
```
Route: /api/auth/new
Type: POST
Content-Type: application/json
Demo JSON:
{
	"name":"Pruebas",
	"email":"pruebas@mail.com",
	"password":"x8Gd7B6F"
}

```
| Login
```
Route: /api/auth
Type: POST
Content-Type: application/json
Demo JSON:
{
	"email":"pruebas@mail.com",
	"password":"x8Gd7B6F"
}
```
| Renew token
```
Route: /api/auth/renew
Type: GET
Content-Type: application/json
Headers: x-token
Where x-token is the token generated in the login
```

### Events
__Note: All the petitions need a valid token.__
<br/>
| New event
<br/>
__Note: All the fields are required__
```
Route: /api/events
Type: POST
Content-Type: application/json
Headers: x-token
Where x-token is the token generated in the login

Elements: 
body: {
    uid:"123"
    title: "Cumpleaños del jefe";
    start: "2021-09-28T05:00:00.000Z";
    end: "2021-09-28T05:00:00.000Z";
    notes: "Comprar el pastel";
    user: {
        _id: "1234";
        name: "Fernando";
    };
}
```
| Get all events
```
Route: /api/events
Type: GET
Content-Type: application/json
Headers: x-token
Where x-token is the token generated in the login
```
| Update events
```
Route: /api/events
Type: PUT
Content-Type: application/json
Headers: x-token
Where x-token is the token generated in the login

Elements: 
body: {
   "uid":"123",
}
```
| Delete parking by id
```
Route: /api/events/:id
Type: DELETE
Headers: x-token
Where x-token is the token generated in the login
```
