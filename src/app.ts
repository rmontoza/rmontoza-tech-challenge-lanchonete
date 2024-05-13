// src/app.ts
import '../inversify.config'; // Importando para garantir que as dependências sejam resolvidas
import express, { Express } from 'express';
import { container } from '../inversify.config';
import { setupSwagger } from './swagger';
import { OrderController } from './adapter/driver/api/controllers/OrderController';
import { TYPES } from '../types';
import { IDatabase } from './adapter/driven/infra/interfaces/IDatabase';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const database = container.get<IDatabase>(TYPES.Database);
database.connect();

// Middlewares
app.use(express.json());

// Configurar Swagger
setupSwagger(app);

// Inicializar controladores
const orderController = container.get<OrderController>(TYPES.OrderController);
app.use(orderController.getRouter());

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
