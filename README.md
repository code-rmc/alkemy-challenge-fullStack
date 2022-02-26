# alkemy-challenge-fullStack
Desarrollar una aplicación para administración de presupuesto personal.

// Bug al desloguearse refrescar la pagina y clickear en logout

## Iniciar app
Las carpetas back y front son independientes con sus paquetes/dependencias 
```js
// Instala todos las dependencias
cd back
npm i
// luego retroceder a la carpeta raiz 
cd ..

// e intalar las dependencias de react
cd front
npm i

// En la carpeta back
// Configure el archivo .env con las variables requeridas Ejemplo en archivo env.example

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

**Auth**

    - POST /api/login
    - POST /api/register
