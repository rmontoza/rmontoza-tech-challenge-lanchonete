import { id, injectable } from 'inversify';
import { IOrderRepository } from '../../../../core/domain/repositories/IOrderRepository';
import Order from '../../../../core/domain/entities/Establishment/Order';
import mongoose from 'mongoose';
import Costumer from '../../../../core/domain/entities/Customer/Customer';

const OrderModel = mongoose.model('Order', new mongoose.Schema({
  customer: Object,
  status: String,
  items: [String],
}));

@injectable()
export class OrderRepository implements IOrderRepository {

  async createOrder(order: Order): Promise<Order> {
    const newOrder = await OrderModel.create({
      customer: order.costumer,
      status: order.status,
      items: order.items,
    });
    return new Order(newOrder._id.toString(), newOrder.customer, newOrder.status!, newOrder.items);
  }

  async getOrders(): Promise<Order[]> {
      const orders = await OrderModel.find().exec();
      const ordersArray = new Array<Order>();

      orders.forEach((order) => {
        ordersArray.push(new Order(order._id.toString(), order.customer!, order.status!, order.items));
      }) 

      return ordersArray;
  }
}
