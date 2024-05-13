// src/core/usecases/OrderUseCase.ts
import { injectable, inject } from 'inversify';
import { IOrderRepository } from '../../repositories/IOrderRepository';
import { IOrderUseCase } from './IOrderUseCase';
import Order from '../../entities/Order';
import { TYPES } from '../../../../../types';


@injectable()
export class OrderUseCaseImpl implements IOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  async createOrder(customerName: string, status: string, items: string[]): Promise<Order> {
    const order = new Order('', customerName, status, items); // Geração de ID fictício
    return this.orderRepository.create(order);
  }
}
