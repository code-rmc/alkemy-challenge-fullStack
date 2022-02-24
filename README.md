# alkemy-challenge-fullStack
Desarrollar una aplicación para administración de presupuesto personal.


## Iniciar app
```js
// Instala todos las dependencias
npm i

// Configure el archivo .env con las variables requeridas
// Luego crea las tablas en la base de datos con el siguiente comando
npx prisma migrate dev --name init

npm run start
```

## EndPoints

    - GET /api/operarion
    - GET /api/operarion/:id
    - POST /api/operarion
    - PUT  /api/operarion/:id
    - DELETE /api/operarion/:id

Auth

    - POST /api/login
    - POST /api/register
