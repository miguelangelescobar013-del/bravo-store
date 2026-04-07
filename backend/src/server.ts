import dotenv from 'dotenv';
import app from './app';
import { connectDB } from './config/db';

dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = async (): Promise<void> => {
  try {
    console.log('Iniciando aplicación...');
    await connectDB();
    console.log('Base de datos conectada, levantando servidor...');

    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo iniciar la aplicación:', error);
  }
};

startServer();