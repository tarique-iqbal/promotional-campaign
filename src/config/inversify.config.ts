import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from './types';
import { IPromotion } from '../core/interfaces/IPromotion';
import { FixedDiscountPromotion } from '../core/promotions/FixedDiscountPromotion';
import { BuyOneGetOneFreePromotion } from '../core/promotions/BuyOneGetOneFreePromotion';
import { BasketService } from '../core/services/BasketService';
import { CheckoutService } from '../core/services/CheckoutService';
import { PriceCalculatorService } from '../core/services/PriceCalculatorService';
import { IExceptionHandler } from '../core/interfaces/IExceptionHandler';
import { ConsoleExceptionHandler } from '../core/handlers/ConsoleExceptionHandler';
import { ConfigService } from '../core/services/ConfigService';
import { IBasketService } from '../core/interfaces/IBasketService';
import { ICheckoutService } from '../core/interfaces/ICheckoutService';
import { IPriceCalculatorService } from '../core/interfaces/IPriceCalculatorService';
import { BuyOverOneProductPromotion } from '../core/promotions/BuyOverOneProductPromotion';

const container = new Container();

container.bind<ConfigService>(ConfigService).toSelf().inSingletonScope();
container
  .bind<IBasketService>(TYPES.BasketService)
  .to(BasketService)
  .inSingletonScope();
container
  .bind<ICheckoutService>(TYPES.CheckoutService)
  .to(CheckoutService)
  .inSingletonScope();
container
  .bind<IPriceCalculatorService>(TYPES.PriceCalculatorService)
  .to(PriceCalculatorService)
  .inSingletonScope();

const configService = container.get<ConfigService>(ConfigService);

container
  .bind<IPromotion>(TYPES.Promotion)
  .toDynamicValue(
    () =>
      new BuyOverOneProductPromotion(
        configService.get<string>('BUY_OVER_ONE_PRODUCT_ID'),
      ),
  );
container
  .bind<IPromotion>(TYPES.Promotion)
  .toDynamicValue(
    () =>
      new FixedDiscountPromotion(
        configService.get<number>('DISCOUNT_AMOUNT'),
        configService.get<number>('MINIMUM_SPEND_AMOUNT'),
      ),
  );
container
  .bind<IPromotion>(TYPES.Promotion)
  .toDynamicValue(
    () =>
      new BuyOneGetOneFreePromotion(
        configService.get<string>('BOGOF_PRODUCT_ID'),
      ),
  );

container
  .bind<IExceptionHandler>(TYPES.ExceptionHandler)
  .to(ConsoleExceptionHandler)
  .inSingletonScope();

export { container };
