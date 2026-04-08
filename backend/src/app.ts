import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import testRoutes from './routes/test.routes';
import categoryRoutes from './routes/category.routes';
import productRoutes from './routes/product.routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (_req, res) => {
  res.status(200).json({
    ok: true,
    message: 'API de Bravo Store funcionando correctamente'
  });
});

app.use('/api', testRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);

export default app;