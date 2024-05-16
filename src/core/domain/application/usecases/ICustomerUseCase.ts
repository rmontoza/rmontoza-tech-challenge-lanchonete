import Costumer from '../../entities/Customer/Customer';


export interface ICustomerUseCase {
    createCostumer(customerName: string, document: string): Promise<Costumer>;
}