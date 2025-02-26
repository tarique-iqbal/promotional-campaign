import { container } from './config/inversify.config';
import { TYPES } from './config/types';
import { BasketService } from './core/services/BasketService';
import { CheckoutService } from './core/services/CheckoutService';
import { IExceptionHandler } from './core/interfaces/IExceptionHandler';
import { Product } from './core/models/Product';

const basketService = container.get<BasketService>(TYPES.BasketService);
const checkoutService = container.get<CheckoutService>(TYPES.CheckoutService);
const exceptionHandler = container.get<IExceptionHandler>(
  TYPES.ExceptionHandler,
);

basketService.addProduct(new Product('1', 'Headphones', 50));
basketService.addProduct(new Product('2', 'Shirt', 30, 25));
basketService.addProduct(new Product('2', 'Shirt', 30, 25));
basketService.addProduct(new Product('3', 'Sweater', 22));
basketService.addProduct(new Product('3', 'Sweater', 22));

try {
  const result = checkoutService.checkout();

  console.log('Original amount:', result.originalAmount);
  console.log('Applied discounts:');
  result.calculationHistory.forEach((entry) => console.log(`  ${entry}`));
  console.log('Final amount:', result.finalAmount);
} catch (error) {
  exceptionHandler.handle(error as Error);
}
