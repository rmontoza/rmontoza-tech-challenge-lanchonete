import 'reflect-metadata';
import { Container } from 'inversify';
import { OrderUseCase } from './src/core/domain/application/usecases/OrderUseCase';
import { OrderController } from './src/adapter/driver/api/controllers/OrderController';
import { IOrderRepository } from './src/core/domain/repositories/IOrderRepository';
import { OrderRepository } from './src/adapter/driven/infra/repositories/OrderRepository';
import { CustomerRepository } from './src/adapter/driven/infra/repositories/CustomerRepository';
import { IOrderUseCase } from './src/core/domain/application/usecases/IOrderUseCase';
import { MongoDatabase } from './src/adapter/driven/infra/databases/MongoDataBase';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'
import { ICustomerRepository } from './src/core/domain/repositories/ICostumerRepository';
import { CustomerController } from './src/adapter/driver/api/controllers/CustomerController';
import { ICustomerUseCase } from './src/core/domain/application/usecases/ICustomerUseCase';
import { CustomerUseCase } from './src/core/domain/application/usecases/CustomerUseCase';


const container = new Container();

// Bindings
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCase);
container.bind<ICustomerUseCase>(TYPES.CustomerUseCase).to(CustomerUseCase);
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<ICustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase('mongodb://mongodb:27018/lanchonete'));

export { container };

