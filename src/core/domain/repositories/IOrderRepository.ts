// src/driven/repositories/OrderRepository.ts
import Order from '../entities/Order';

export interface IOrderRepository {
  create(order: Order): Promise<Order>;
}
