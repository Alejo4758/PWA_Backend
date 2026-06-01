require ("dotenv").config ();

const express = require ("express");
const cors = require ("cors");

const app = express ();

app.use (express.json ());

app.use (cors ({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

app.get ("/health", (req, res) => {
  res.status (200).json ({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

app.get ("/", (req, res) => {
  res.status (200).json ({
    message: "Hola Mundo :D"
  });
});

app.use ((error, req, res, next) => {
  console.error (error);
  res.status (500).json ({
    error: "Error interno del servidor"
  });
});

app.use ((req, res) => {
  res.status (404).json ({
    error: "Ruta no encontrada"
  });
});

module.exports = app;