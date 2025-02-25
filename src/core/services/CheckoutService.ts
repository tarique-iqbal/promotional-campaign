import { inject, injectable, multiInject } from 'inversify';

import { IPromotion } from '../interfaces/IPromotion';
import { TYPES } from '../../config/types';
import { PriceCalculationResult } from '../models/PriceCalculationResult';
import { sortPromotions } from '../utils/PromotionUtils';
import { ICheckoutService } from '../interfaces/ICheckoutService';
import { IPriceCalculatorService } from '../interfaces/IPriceCalculatorService';
import { IBasketService } from '../interfaces/IBasketService';

@injectable()
export class CheckoutService implements ICheckoutService {
  constructor(
    @multiInject(TYPES.Promotion) private promotions: IPromotion[],
    @inject(TYPES.BasketService) private readonly basketService: IBasketService,
    @inject(TYPES.PriceCalculatorService)
    private readonly priceCalculatorService: IPriceCalculatorService,
  ) {}

  checkout(): PriceCalculationResult {
    const products = this.basketService.getProducts();
    const originalAmount =
      this.priceCalculatorService.calculateOriginalAmount(products);

    sortPromotions(this.promotions);
    return this.priceCalculatorService.applyPromotions(
      products,
      this.promotions,
      originalAmount,
    );
  }
}
