import { inject, injectable } from "inversify";
import { StatusOrderEnum } from "../../../enums/StatusOrderEnum";
import { ICheckoutUseCase } from "./ICheckoutUseCase";
import { TYPES } from "../../../../../../types";
import { ICheckoutRepository } from "../../../repositories/ICheckoutRepository";
import { IOrderRepository } from "../../../repositories/IOrderRepository";
import { ValidationError } from "../../../erros/DomainErros";
import { IOrderUseCase } from "../Order/IOrderUseCase";
import Order from "../../../entities/Order/Order";
import OrderItem from "../../../entities/Order/OrderItem";

@injectable()
export class CheckoutUseCase implements ICheckoutUseCase, IOrderUseCase {

    constructor(
        @inject(TYPES.CheckoutRepository) private readonly checkoutRepository: ICheckoutRepository,
        @inject(TYPES.OrderRepository) private readonly orderRepository: IOrderRepository,
      ) {}
  getOrderByNumber(orderNumber: number): Promise<Order> {
    throw new Error("Method not implemented.");
  }
    createOrder(document: string, orderItem: OrderItem[], valueOrder: number): Promise<Order> {
        throw new Error("Method not implemented.");
    }
    getOrders(): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    findByNumberOrder(orderNumber: number): Promise<Order[]> {
        throw new Error("Method not implemented.");
    }
    updateStatusOrder(idOrder: string, status: StatusOrderEnum): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async checkout(id: string): Promise<void> {
        const targetStatus = StatusOrderEnum.PAIDOUT;
        this.validateOrderStatus(targetStatus);
        const current = await this.orderRepository.getById(id);
        if (!current) {
          throw new ValidationError(`Order not found: ${id}`);
        }
        // Permitir pagamento somente se finalizado
        if ((current.status as StatusOrderEnum) !== StatusOrderEnum.FINISHED) {
          throw new ValidationError(`Invalid status transition: ${current.status} -> ${targetStatus}`);
        }
        return this.checkoutRepository.checkout(id, targetStatus);
    }


  private validateOrderStatus(status: any): void {
    if (!Object.values(StatusOrderEnum).includes(status)) {
      throw new ValidationError(`Invalid order status: ${status}`);
    }
  }
}