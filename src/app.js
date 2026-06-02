const express = require ("express");
const cors = require ("cors");
const errorHandler = require ("./middlewares/errorHandler");

const app = express ();

app.use (express.json ());

app.use (cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true,
}));

app.get ("/api/health", (req, res) => {
  res.status (200).json ({
    status: "ok",
    message: "API funcionando correctamente"
  });
});

app.use ((req, res) => {
  res.status (404).json({
    error: "Ruta no encontrada"
  });
});

app.use (errorHandler);

module.exports = app;