import Order from '../entities/Order/Order';
import { StatusOrderEnum } from '../enums/StatusOrderEnum'

export interface IOrderRepository {
  createOrder(order: Order): Promise<Order>;
  getOrders(): Promise<Order[]>;
  updateStatusOrder(id: string, status: StatusOrderEnum): Promise<void>
}
