# DISNEY FILMS API

## Descripción
API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron.

## Desarrollado con

### Backend
- [Express.js](https://expressjs.com/es/) - Servidor web ligero para Node.Js
- [Sequelize](https://sequelize.org/master/) - ORM para Node. js
- SendGrid - Para envío de email

## Instalación y uso
Clonar este repositorio
```bash
https://github.com/deoraczo/nodejs-alkemy-challenge.git
```

Crear los archivos `.env`, `.env.dev` y `.env.test` 
```bash
cp .env.example .env.dev
```
Llene el archivo `.env` con variables de entorno:
```bash
PORT=

DB_DIALECT=mysql
DB_HOST=
DB_USER=
DB_PASS=
DB_NAME=

JWT_SECRET=
JWT_EXPIRES_IN=12h #1m, 1h, 24h

MAIL_API_KEY=    #API SENGRID

S3_ACCESS_KEY=
S3_SECRET_KEY=
S3_BUCKET_NAME=
```
Instalar dependencias de backend
```bash
npm install
```

Iniciar backend en modo desarollo
```
npm run dev
```

## DEMO
[Disney films api](https://nodejs-alkemy.herokuapp.com/)

Credenciales:
- email: demo@demo.com
- password: demo