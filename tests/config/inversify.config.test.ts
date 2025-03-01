import { TYPES } from '../../src/config/types';
import { IPromotion } from '../../src/core/interfaces/IPromotion';
import { FixedDiscountPromotion } from '../../src/core/promotions/FixedDiscountPromotion';
import { BuyOneGetOneFreePromotion } from '../../src/core/promotions/BuyOneGetOneFreePromotion';
import { BuyOverOneProductPromotion } from '../../src/core/promotions/BuyOverOneProductPromotion';
import { BasketService } from '../../src/core/services/BasketService';
import { CheckoutService } from '../../src/core/services/CheckoutService';
import { PriceCalculatorService } from '../../src/core/services/PriceCalculatorService';
import { IExceptionHandler } from '../../src/core/interfaces/IExceptionHandler';
import { ConsoleExceptionHandler } from '../../src/core/handlers/ConsoleExceptionHandler';
import { ConfigService } from '../../src/core/services/ConfigService';
import { container } from '../../src/config/inversify.config';

describe('Container Configuration', () => {
  it('should correctly bind BasketService', () => {
    const basketService = container.get<BasketService>(TYPES.BasketService);
    expect(basketService).toBeInstanceOf(BasketService);
  });

  it('should correctly bind PriceCalculatorService', () => {
    const priceCalculatorService = container.get<PriceCalculatorService>(
      TYPES.PriceCalculatorService,
    );
    expect(priceCalculatorService).toBeInstanceOf(PriceCalculatorService);
  });

  it('should correctly bind CheckoutService', () => {
    const checkoutService = container.get<CheckoutService>(
      TYPES.CheckoutService,
    );
    expect(checkoutService).toBeInstanceOf(CheckoutService);
  });

  it('should bind promotions correctly', () => {
    const promotion = container.getAll<IPromotion>(TYPES.Promotion);
    expect(promotion).toMatchObject([
      new BuyOverOneProductPromotion('2'),
      new FixedDiscountPromotion(5, 50),
      new BuyOneGetOneFreePromotion('3'),
    ]);
  });

  it('should bind ConsoleExceptionHandler as ExceptionHandler', () => {
    const exceptionHandler = container.get<IExceptionHandler>(
      TYPES.ExceptionHandler,
    );
    expect(exceptionHandler).toBeInstanceOf(ConsoleExceptionHandler);
  });

  it('should bind ConfigService correctly', () => {
    const configService = container.get<ConfigService>(ConfigService);
    expect(configService).toBeInstanceOf(ConfigService);
  });
});
