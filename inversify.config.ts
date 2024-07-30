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
import { ICheckoutRepository } from './src/core/domain/repositories/ICheckoutRepository';
import { CheckoutRepository } from './src/adapter/driven/infra/repositories/CheckoutRepository';
import { CheckoutController } from './src/adapter/driver/api/controllers/CheckoutController';
import { ICheckoutUseCase } from './src/core/domain/application/usecases/Checkout/ICheckoutUseCase';
import { CheckoutUseCase } from './src/core/domain/application/usecases/Checkout/CheckoutUseCase';
import dotenv from 'dotenv';
dotenv.config();

const container = new Container();

// Bindings
//Use Cases
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCase);
container.bind<ICustomerUseCase>(TYPES.CustomerUseCase).to(CustomerUseCase);
container.bind<IProductUseCase>(TYPES.ProductUseCase).to(ProductUseCase);
container.bind<ICheckoutUseCase>(TYPES.CheckoutUseCase).to(CheckoutUseCase);


//Repositorys
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepository);
container.bind<ICustomerRepository>(TYPES.CustomerRepository).to(CustomerRepository);
container.bind<IProductRepository>(TYPES.ProductRepository).to(ProductRepository);
container.bind<ICheckoutRepository>(TYPES.CheckoutRepository).to(CheckoutRepository);

//Controllers
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<CustomerController>(TYPES.CustomerController).to(CustomerController);
container.bind<ProductController>(TYPES.ProductController).to(ProductController);
container.bind<CheckoutController>(TYPES.CheckoutController).to(CheckoutController);



//Databases
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase(`${process.env.MONGODB_URI}`));

export { container };

