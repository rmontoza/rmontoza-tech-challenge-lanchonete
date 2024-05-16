import { id, injectable } from 'inversify';
import { ICustomerRepository } from '../../../../core/domain/repositories/ICostumerRepository';
import Customer from '../../../../core/domain/entities/Customer/Customer';
import mongoose from 'mongoose';

const CustomerModel = mongoose.model('Costumer', new mongoose.Schema({
    customerName: String,
    document: String,
  }));

  @injectable()
  export class CustomerRepository implements ICustomerRepository{

    async findCostumer(document: string): Promise<Customer | null> {

      const customer = await CustomerModel.findOne({document: document});
      return customer != null ? new Customer(customer._id.toString(), customer.customerName!,  customer.document!) : null;
    }


    async createCustomer(costumer: Customer): Promise<Customer> {

        const newCostumer = await CustomerModel.create({
            customerName: costumer.customerName,
            document: costumer.document,
        });
        return new Customer(newCostumer._id.toString(), newCostumer.customerName!, newCostumer.document!);
        
    }
    
  }