import { injectable, inject } from 'inversify';
import { IOrderRepository } from '../../repositories/IOrderRepository';
import { IOrderUseCase } from './IOrderUseCase';
import Order from '../../entities/Establishment/Order';
import Costumer from '../../entities/Customer/Customer';
import { TYPES } from '../../../../../types';



@injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}

  async createOrder(costumer: Costumer, status: string, items: string[]): Promise<Order> {
    const order = new Order('', costumer, status, items);
    return this.orderRepository.createOrder(order);
  }

  async getOrders(): Promise<Order[]> {
   return this.orderRepository.getOrders();
  }

}
