// src/application/controllers/OrderController.ts
import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { OrderUseCaseImpl } from '../../../../core/domain/application/usecases/OrderUseCaseImpl';
import { TYPES } from '../../../../../types';

@injectable()
export class OrderController {
  private router = express.Router();

  constructor(
    @inject(TYPES.OrderUseCase) private orderUseCase: OrderUseCaseImpl,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/orders', this.createOrder.bind(this));
  }

  /**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               status:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 status:
 *                   type: string
 *                 items:
 *                   type: array
 *                   items:
 *                     type: string
 *       500:
 *         description: Erro interno do servidor
 */

  private async createOrder(req: Request, res: Response) {
    try {
      const { customerName, status, items } = req.body;
      const order = await this.orderUseCase.createOrder(customerName, status, items);
      res.status(201).json(order);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public getRouter() {
    return this.router;
  }
}
