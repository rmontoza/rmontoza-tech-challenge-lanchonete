import Customer from '../entities/Customers/Customer';

export interface ICustomerRepository {
  createCustomer(costumer: Customer): Promise<Customer>;
  findCostumer(document: string): Promise<Customer | null>;
}