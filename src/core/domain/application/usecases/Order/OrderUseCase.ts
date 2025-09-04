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

  async getOrderByNumber(orderNumber: number): Promise<Order | null> {

    const order = await this.orderRepository.getOrderByNumber(orderNumber); 
    

    if(order == null){
      throw new NotFoundError("Order not found!");
    }

    return order;

  }

  
  updateStatusOrder(idOrder: string, status: StatusOrderEnum): Promise<void> {
    this.validateOrderStatus(status);
    return (async () => {
      const current = await this.orderRepository.getById(idOrder);
      if (!current) {
        throw new NotFoundError('Order not found!');
      }
      this.ensureValidTransition(current.status as StatusOrderEnum, status);
      await this.orderRepository.updateStatusOrder(idOrder, status);
    })();
  }


  createOrder(document: string, orderItem: OrderItem[], valueOrder: number): Promise<Order> {


    const order = new Order('', 0, document, '', orderItem, valueOrder, new Date());

    this.validateOrder(order);

    order.orderNumber = this.generateOrderCode();
    return this.orderRepository.createOrder(order);
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

  private ensureValidTransition(currentStatus: StatusOrderEnum, nextStatus: StatusOrderEnum): void {
    const allowed: Record<StatusOrderEnum, StatusOrderEnum[]> = {
      [StatusOrderEnum.CREATED]: [StatusOrderEnum.PREPARING],
      [StatusOrderEnum.PREPARING]: [StatusOrderEnum.FINISHED],
      [StatusOrderEnum.FINISHED]: [StatusOrderEnum.PAIDOUT],
      [StatusOrderEnum.PAIDOUT]: [],
      [StatusOrderEnum.FAILED]: [],
    };
    const allowedNext = allowed[currentStatus] || [];
    if (!allowedNext.includes(nextStatus)) {
      throw new ValidationError(`Invalid status transition: ${currentStatus} -> ${nextStatus}`);
    }
  }

  private validateOrder(order: Order): void {
    if (order.orderItem.length == 0) {
      throw new ValidationError(`Order without items`);
    }
  }

}
