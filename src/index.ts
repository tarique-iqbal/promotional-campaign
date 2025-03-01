import { container } from './config/inversify.config';
import { TYPES } from './config/types';
import { BasketService } from './core/services/BasketService';
import { ConfigService } from './core/services/ConfigService';
import { CheckoutService } from './core/services/CheckoutService';
import { IExceptionHandler } from './core/interfaces/IExceptionHandler';
import { Product } from './core/models/Product';

const basketService = container.get<BasketService>(TYPES.BasketService);
const checkoutService = container.get<CheckoutService>(TYPES.CheckoutService);
const configService = container.get<ConfigService>(ConfigService);
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
  const currencySymbol = configService.get<string>('CURRENCY_SYMBOL');

  console.log(`Original amount: ${currencySymbol}${result.originalAmount}`);
  console.log('Applied discounts:');
  result.basketDiscounts.forEach((discount, index) => {
    console.log(`  Promotion ${index + 1}: -${currencySymbol}${discount}`);
  });
  console.log(`Final amount: ${currencySymbol}${result.finalAmount}`);
} catch (error) {
  exceptionHandler.handle(error as Error);
}
