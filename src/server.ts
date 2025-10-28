import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth.routes';
import autorRoutes from './routes/autor.routes';
import editorialRoutes from './routes/editorial.routes';
import generoRoutes from './routes/genero.routes';
import libroRoutes from './routes/libro.routes';
import ejemplarRoutes from './routes/ejemplar.routes';
import prestamoRoutes from './routes/prestamo.routes';
import deudaRoutes from './routes/deuda.routes';
import detallePrestamoRoutes from './routes/detallePrestamo.routes';
import comentarioRoutes from './routes/comentario.routes';
import { getPaises, getSexos } from './controllers/catalog.controller';
import usuarioRoutes from './routes/usuario.routes';

dotenv.config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

app.get('/', (_, res) => {
  res.send('🚀 Backend funcionando correctamente');
});

app.get('/api/paises', getPaises);
app.get('/api/sexos', getSexos);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/autores', autorRoutes);
app.use('/api/editoriales', editorialRoutes);
app.use('/api/generos', generoRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/ejemplares', ejemplarRoutes);
app.use('/api/prestamos', prestamoRoutes);
app.use('/api/deudas', deudaRoutes);
app.use('/api/detalle-prestamos', detallePrestamoRoutes);
app.use('/api/comentarios', comentarioRoutes);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('❌ Error interno:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en el puerto ${PORT}`);
});
