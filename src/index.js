import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from '../prisma/prismaClient.js';
import relojesRoutes from './routes/relojes.js';

const app = express();
const PORT = process.env.PORT || 3000;

const opcionesCors = {
  origin: process.env.FRONTEND_URL || '*', 
};
app.use(cors(opcionesCors));

app.use(express.json());

// Prueba de conexión
async function probarConexion() {
  try {
    await prisma.$connect();
    console.log('🟢 Conexión a la base de datos PostgreSQL exitosa.');
  } catch (error) {
    console.error('🔴 Error al conectar con la base de datos:', error);
  }
}
probarConexion();

app.get('/', (req, res) => {
  res.send('API de Tempo Deluxe funcionando correctamente ⌚');
});

app.use('/api/items', relojesRoutes); 

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en el puerto ${PORT}`);
});