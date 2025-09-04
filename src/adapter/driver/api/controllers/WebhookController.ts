import express, { Request, Response } from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../../../../../types';
import { IOrderUseCase } from '../../../../core/domain/application/usecases/Order/IOrderUseCase';
import { HandleError } from './errors/HandleError';
import { StatusOrderEnum } from '../../../../core/domain/enums/StatusOrderEnum';

const err = new HandleError();

@injectable()
export class WebhookController {
  private router = express.Router();

  constructor(
    @inject(TYPES.OrderUseCase) private readonly orderUseCase: IOrderUseCase,
  ) {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/webhook/mercadopago', this.mercadoPago.bind(this));
  }

  /**
   * @swagger
   * /webhook/mercadopago:
   *   post:
   *     tags: [Webhook]
   *     summary: Recebe eventos do Mercado Pago
   *     description: Endpoint de webhook para processar eventos de pagamento. Em produção, valide assinatura e implemente idempotência.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               idOrder:
   *                 type: string
   *               event:
   *                 type: string
   *                 example: payment.approved
   *     responses:
   *       204:
   *         description: Evento processado com sucesso
   *       400:
   *         description: Requisição inválida
   *       500:
   *         description: Erro interno do servidor
   */
  // Simplificado: em produção, validar assinatura/evento e idempotência
  private async mercadoPago(req: Request, res: Response) {
    try {
      const { idOrder, event } = req.body;
      if (!idOrder || !event) {
        return res.status(400).json({ error: 'idOrder and event are required' });
      }
      if (event === 'payment.approved') {
        await this.orderUseCase.updateStatusOrder(idOrder, StatusOrderEnum.PAIDOUT);
      }
      return res.status(204).send();
    } catch (error) {
      err.handleError(res, error);
    }
  }

  public getRouter() {
    return this.router;
  }
}
