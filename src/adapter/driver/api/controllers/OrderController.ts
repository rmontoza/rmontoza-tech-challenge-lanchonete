import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { IOrderUseCase } from '../../../../core/domain/application/usecases/IOrderUseCase';
import { TYPES } from '../../../../../types';

@injectable()
export class OrderController {
  private router = express.Router();

  constructor(
    @inject(TYPES.OrderUseCase) private orderUseCase: IOrderUseCase,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/orders', this.createOrder.bind(this));
    this.router.get('/api/get-orders', this.getOrders.bind(this));
  }
  /**
   * @swagger
   * tags:
   *   - name: Order
   *     description: Operações relacionadas a Pedidos
   */

   /**
 * @swagger
 * /api/orders:
 *   post:
 *     tags: [Order]
 *     summary: Cria um novo pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerId:
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
      const { costumer, status, items } = req.body;
      const order = await this.orderUseCase.createOrder(costumer, status, items);
      res.status(201).json(order);
    } catch (error) {
      console.error('Erro ao consultar pedidos:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  /**
 * @swagger
 * /api/get-orders:
 *   get:
 *     tags: [Order]
 *     summary: Consulta a lista de pedidos
 *     responses:
 *       200:
 *         description: Pedidos consultado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
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
  private async getOrders(req: Request, res: Response){
    try {
      const orders = await this.orderUseCase.getOrders();
      res.status(200).json(orders);
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }

  public getRouter() {
    return this.router;
  }
}
