import Order from '../entities/Establishment/Order';

export interface IOrderRepository {
  createOrder(order: Order): Promise<Order>;
  getOrders(): Promise<Order[]>;

}
