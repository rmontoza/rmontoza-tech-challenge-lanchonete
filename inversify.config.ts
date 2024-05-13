import 'reflect-metadata';
import { Container } from 'inversify';
import { OrderUseCaseImpl } from './src/core/domain/application/usecases/OrderUseCaseImpl';
import { OrderController } from './src/adapter/driver/api/controllers/OrderController';
import { IOrderRepository } from './src/core/domain/repositories/IOrderRepository';
import { OrderRepositoryImpl } from './src/adapter/driven/infra/repositories/OrderRepositoryImpl';
import { IOrderUseCase } from './src/core/domain/application/usecases/IOrderUseCase';
import { MongoDatabase } from './src/adapter/driven/infra/databases/MongoDataBase';
import { IDatabase } from './src/adapter/driven/infra/interfaces/IDatabase';
import { TYPES } from './types'


const container = new Container();

// Bindings
container.bind<IOrderUseCase>(TYPES.OrderUseCase).to(OrderUseCaseImpl);
container.bind<IOrderRepository>(TYPES.OrderRepository).to(OrderRepositoryImpl);
container.bind<OrderController>(TYPES.OrderController).to(OrderController);
container.bind<IDatabase>(TYPES.Database).toConstantValue(new MongoDatabase('mongodb://mongodb:27018/lanchonete'));

export { container };

