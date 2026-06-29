import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import prisma from '../prisma/prismaClient.js';
import relojesRoutes from './routes/relojes.js';
import authRoutes from './routes/auth/index.js';
import favoritesRoutes from './routes/favorites/index.js';

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',') 
  : [];

const opcionesCors = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
};

app.use(cors(opcionesCors));
app.use(express.json());

async function probarConexion() {
  try {
    await prisma.$connect();
    console.log('Conexion a la base de datos PostgreSQL exitosa.');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}
probarConexion();

app.get('/', (req, res) => {
  res.send('API de Tempo Deluxe funcionando correctamente');
});

app.use('/api/items', relojesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/favorites', favoritesRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en el puerto ${PORT}`);
});

export default app;