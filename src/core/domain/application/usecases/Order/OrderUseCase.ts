import { injectable, inject } from 'inversify';
import { IOrderRepository } from '../../../repositories/IOrderRepository';
import { IOrderUseCase } from './IOrderUseCase';
import Order from '../../../entities/Order/Order';
import { TYPES } from '../../../../../../types';
import OrderItem from '../../../entities/Order/OrderItem';
import { StatusOrderEnum } from '../../../enums/StatusOrderEnum';
import { ValidationError, DatabaseError, NotFoundError } from '../../../erros/DomainErros';


@injectable()
export class OrderUseCase implements IOrderUseCase {
  constructor(
    @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
  ) {}
  updateStatusOrder(idOrder: string, status: StatusOrderEnum): Promise<void> {

    this.validateOrderStatus(status);
    
    return this.orderRepository.updateStatusOrder(idOrder, status);
  }


  createOrder(document: string, orderItem: OrderItem[], valueOrder: number): Promise<Order> {
    const order = new Order('', 0, document, '', orderItem, valueOrder);
    order.orderNumber = this.generateOrderCode();
    return this.orderRepository.createOrder(order);
  }


  findByNumberOrder(orderNumber: number): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }



  async getOrders(): Promise<Order[]> {
   return this.orderRepository.getOrders();
  }

  private generateOrderCode(): number {
    return Math.floor(10000 + Math.random() * 90000); // Gera um número entre 10000 e 99999
  }

  private validateOrderStatus(status: any): void {
    if (!Object.values(StatusOrderEnum).includes(status)) {
      throw new ValidationError(`Invalid order status: ${status}`);
    }
  }

}
