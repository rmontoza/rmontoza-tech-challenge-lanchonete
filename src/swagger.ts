// src/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import path from 'path';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Lanchonete API',
      version: '1.0.0',
      description: 'Documentação da API da lanchonete',
    },
    servers: [
      {
        url: 'http://localhost:3000', // URL da sua API
      },
    ],
  },
  apis: [path.resolve(__dirname, './**/*.ts')],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  // Rota para exibir a interface do Swagger
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
