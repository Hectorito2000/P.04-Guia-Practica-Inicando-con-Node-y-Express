// Importamos express, el framework para manejar rutas y peticiones
import express from 'express';

// Importamos nuestro router de usuarios
import usersRouter from './routes/users.js';

// Importamos las variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config();

// Creamos una instancia de express (nuestro servidor)
const app = express();

// Middleware que permite interpretar JSON en las peticiones
app.use(express.json());

// Ruta raíz
app.get('/', (req, res) => {
  res.send('¡Hola, mundo UNICAES! El servidor está funcionando correctamente.');
});

// Rutas de usuarios
app.use('/users', usersRouter);

// Iniciamos el servidor
app.listen(process.env.PORT || 3000, () => {
  console.log(`Servidor corriendo en http://localhost:${process.env.PORT || 3000}`);
});