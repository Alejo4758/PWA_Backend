import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from '../prisma/prismaClient.js';
import relojesRoutes from './routes/relojes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
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

app.use('/api/relojes', relojesRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});