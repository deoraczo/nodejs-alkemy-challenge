# DISNEY FILMS API

## Descripción
API para explorar el mundo de Disney, la cual permitirá conocer y modificar los
personajes que lo componen y entender en qué películas estos participaron.

## Desarrollado con

### Backend
- Express.js - Servidor web ligero para Node.Js
- Sequelize - ORM para Node. js
- SendGrid - Para envío de email

## Instalación y uso
Clonar este repositorio
```bash
https://github.com/deoraczo/nodejs-alkemy-challenge.git
```

Crear los archivos `.env` y .env.test
```bash
cp .env.example .env
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
```
