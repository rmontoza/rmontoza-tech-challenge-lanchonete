import Order from '../../entities/Order';

export interface IOrderUseCase {
    createOrder(customerName: string, status: string, items: string[]): Promise<Order>;
  }
