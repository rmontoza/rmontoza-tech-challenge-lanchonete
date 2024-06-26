import '../inversify.config';
import express, { Express } from 'express';
import { container } from '../inversify.config';
import { setupSwagger } from './swagger';
import { OrderController } from './adapter/driver/api/controllers/OrderController';
import { CustomerController } from './adapter/driver/api/controllers/CustomerController';
import { ProductController } from './adapter/driver/api/controllers/ProductController';

import { TYPES } from '../types';
import { IDatabase } from './adapter/driven/infra/interfaces/IDatabase';
import { CheckoutController } from './adapter/driver/api/controllers/CheckoutController';

const app: Express = express();
const PORT = process.env.PORT || 3000;

const database = container.get<IDatabase>(TYPES.Database);
database.connect();

app.use(express.json());

setupSwagger(app);

const orderController = container.get<OrderController>(TYPES.OrderController);
const customerController = container.get<CustomerController>(TYPES.CustomerController);
const productController = container.get<ProductController>(TYPES.ProductController);
const checkoutController = container.get<CheckoutController>(TYPES.CheckoutController);


app.use(orderController.getRouter());
app.use(customerController.getRouter());
app.use(productController.getRouter());
app.use(checkoutController.getRouter());



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
