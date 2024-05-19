import 'reflect-metadata';
import { Container } from 'inversify';
import { OrderUseCase } from './src/core/domain/application/usecases/Order/OrderUseCase';
import { OrderController } from './src/adapter/driver/api/controllers/OrderController';
import { IOrderRepository } from './src/core/domain/repositories/IOrderRepository';
import { OrderRepository } from './src/adapter/driven/infra/repositories/OrderRepository';
import { CustomerRepository } from './src/adapter/driven/infra/repositories/CustomerRepository';
import { IOrderUseCase } from './src/core/domain/application/usecases/Order/IOrderUseCase';
import { MongoDatabase } from './src/adapter/driven/infra/databases/MongoDataBase';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'
import { ICustomerRepository } from './src/core/domain/repositories/ICostumerRepository';
import { CustomerController } from './src/adapter/driver/api/controllers/CustomerController';
import { ICustomerUseCase } from './src/core/domain/application/usecases/Customer/ICustomerUseCase';
import { CustomerUseCase } from './src/core/domain/application/usecases/Customer/CustomerUseCase';
import { IProductUseCase } from './src/core/domain/application/usecases/Product/IProductUseCase';
import { ProductUseCase } from './src/core/domain/application/usecases/Product/ProductUseCase';
import { IProductRepository } from './src/core/domain/repositories/IProductRepository';
import { ProductRepository } from './src/adapter/driven/infra/repositories/ProductRepository';
import { ProductController } from './src/adapter/driver/api/controllers/ProductController';


const container = new Container();

// Bindings
//Use Cases
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCase);
container.bind<ICustomerUseCase>(TYPES.CustomerUseCase).to(CustomerUseCase);
container.bind<IProductUseCase>(TYPES.ProductUseCase).to(ProductUseCase);

//Repositorys
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<ICustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);

//Controllers
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);


//Databases
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase('mongodb://mongodb:27018/lanchonete'));
//container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase('mongodb://localhost:27017/lanchonete'));


export { container };

