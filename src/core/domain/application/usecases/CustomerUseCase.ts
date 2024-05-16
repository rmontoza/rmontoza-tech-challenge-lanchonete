import { injectable, inject } from 'inversify';
import { ICustomerRepository } from '../../repositories/ICostumerRepository';
import Costumer from '../../entities/Customer/Customer';
import { TYPES } from '../../../../../types';
import { ICustomerUseCase } from './ICustomerUseCase';
import { ValidationError, DatabaseError } from '../../erros/DomainErros';

@injectable()
export class CustomerUseCase implements ICustomerUseCase {
  constructor(
    @inject(TYPES.CustomerRepository) private readonly customerRepository: ICustomerRepository,
  ) {}
    async createCostumer(customerName: string, document: string): Promise<Costumer> {

      const customer = new Costumer('', customerName, document);

      if(await this.customerRepository.findCostumer(document) != null){
        throw new ValidationError("Customer already exists");
      }

      try {
        
        return this.customerRepository.createCustomer(customer);

      } catch (error) {
        console.log(error);
        throw new DatabaseError("Internal error server - Failed to create customer ");
      }



    }
}