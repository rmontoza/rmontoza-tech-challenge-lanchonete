// src/adapter/repositories/OrderRepositoryImpl.ts
import { injectable } from 'inversify';
import { IOrderRepository } from '../../../../core/domain/repositories/IOrderRepository';
import Order from '../../../../core/domain/entities/Order';
import mongoose from 'mongoose';

const OrderModel = mongoose.model('Order', new mongoose.Schema({
  customerName: String,
  status: String,
  items: [String],
}));

@injectable()
export class OrderRepositoryImpl implements IOrderRepository {
  async create(order: Order): Promise<Order> {
    const newOrder = await OrderModel.create({
      customerName: order.customerName,
      status: order.status,
      items: order.items,
    });
    return new Order(newOrder._id.toString(), newOrder.customerName!, newOrder.status!, newOrder.items);
  }
}
