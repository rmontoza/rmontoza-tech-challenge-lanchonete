import { inject, injectable } from "inversify";
import { StatusOrderEnum } from "../../../enums/StatusOrderEnum";
import { ICheckoutUseCase } from "./ICheckoutUseCase";
import { TYPES } from "../../../../../../types";
import { ICheckoutRepository } from "../../../repositories/ICheckoutRepository";
import { ValidationError } from "../../../erros/DomainErros";
import { IOrderUseCase } from "../Order/IOrderUseCase";
import Order from "../../../entities/Order/Order";
import OrderItem from "../../../entities/Order/OrderItem";

@injectable()
export class CheckoutUseCase implements ICheckoutUseCase, IOrderUseCase {

    constructor(
        @inject(TYPES.CheckoutRepository) private readonly checkoutRepository: ICheckoutRepository,
      ) {}
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

    checkout(id: string, status: StatusOrderEnum): Promise<void> {

        this.validateOrderStatus(status);

        return this.checkoutRepository.checkout(id, status);
    }


  private validateOrderStatus(status: any): void {
    if (!Object.values(StatusOrderEnum).includes(status)) {
      throw new ValidationError(`Invalid order status: ${status}`);
    }
  }
}