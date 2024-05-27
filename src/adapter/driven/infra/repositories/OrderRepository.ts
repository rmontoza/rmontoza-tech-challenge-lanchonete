import { injectable } from 'inversify';
import { IOrderRepository } from '../../../../core/domain/repositories/IOrderRepository';
import Order from '../../../../core/domain/entities/Order/Order';
import OrderItem from '../../../../core/domain/entities/Order/OrderItem';
import { StatusOrderEnum } from '../../../../core/domain/enums/StatusOrderEnum';


import mongoose from 'mongoose';

const OrderItemSchema = new mongoose.Schema({
  item: String,
  valeu: Number,
  quanity: Number,
});

const OrderModel = mongoose.model('Order', new mongoose.Schema({
  orderNumber: Number,
  document: String,
  status: String,
  orderItem: [OrderItemSchema],
  valeuOrder: Number
}));

@injectable()
export class OrderRepository implements IOrderRepository {

  async updateStatusOrder(id: string, status: StatusOrderEnum): Promise<void> {
    await OrderModel.findByIdAndUpdate(id, {
      status: status
  });
  }

  async createOrder(order: Order): Promise<Order> {

    const orderItemArray = new Array<OrderItem>();

    const newOrder = await OrderModel.create({
      orderNumber: order.orderNumber,
      document: order.document,
      status: StatusOrderEnum.CREATED,
      orderItem: order.orderItem,
      valeuOrder: order.valueOrder
    });

    newOrder.orderItem.forEach((item)=>{
      orderItemArray.push(new OrderItem(item.item!, item.valeu!, item.quanity!));
    });

    return new Order(newOrder._id.toString(), newOrder.orderNumber!, newOrder.document!, newOrder.status!, orderItemArray, newOrder.valeuOrder!);
  }

  async getOrders(): Promise<Order[]> {
      const orders = await OrderModel.find().exec();
      const ordersArray = new Array<Order>();


      orders.forEach((order) => {

        const orderItenArray = new Array<OrderItem>();

        order.orderItem.forEach((item)=>{
          orderItenArray.push(new OrderItem(item.item!, item.valeu!, item.quanity!));
        });

        ordersArray.push(new Order(order._id.toString(), order.orderNumber!, order.document!, order.status!, orderItenArray, order.valeuOrder!));
      }) 

      return ordersArray;
  }
}
