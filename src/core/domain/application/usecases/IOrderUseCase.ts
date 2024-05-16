import Order from '../../entities/Establishment/Order';
import Costumer from '../../entities/Customer/Customer';


export interface IOrderUseCase {
    createOrder(costumer: Costumer, status: string, items: string[]): Promise<Order>;
    getOrders(): Promise<Order[]>;
  }
