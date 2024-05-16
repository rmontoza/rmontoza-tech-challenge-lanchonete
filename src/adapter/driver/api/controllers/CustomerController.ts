import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { ICustomerUseCase } from '../../../../core/domain/application/usecases/ICustomerUseCase';
import { HandleError } from './errors/HandleError'

import { TYPES } from '../../../../../types';

const err = new HandleError();

@injectable()
export class CustomerController {
  private router = express.Router();
  
  constructor(
    @inject(TYPES.CustomerUseCase) private costumerUseCase: ICustomerUseCase,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/api/customer', this.createCostumer.bind(this));
  }

/**
 * @swagger
 * tags:
 *   - name: Customer
 *     description: Operações relacionadas ao Cliente
 */

  /**
 * @swagger
 * /api/customer:
 *   post:
 *     tags: [Customer]
 *     summary: Cria um novo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               document:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cliente criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 document:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 */
  private async createCostumer(req: Request, res: Response) {
    try {
      const { customerName, document } = req.body;
      const order = await this.costumerUseCase.createCostumer(customerName, document);
      res.status(201).json(order);
    } catch (error) {
      err.handleError(res, error);
    }
  }

  public getRouter() {
    return this.router;
  }
}