import { injectable } from 'inversify';

import { Product } from '../models/Product';
import { IPromotion } from '../interfaces/IPromotion';
import { PriceCalculationResult } from '../models/PriceCalculationResult';
import { IPriceCalculatorService } from '../interfaces/IPriceCalculatorService';

@injectable()
export class PriceCalculatorService implements IPriceCalculatorService {
  calculateOriginalAmount(products: Product[]): number {
    return products.reduce((sum, product) => sum + product.price, 0);
  }

  applyPromotions(
    products: Product[],
    promotions: IPromotion[],
    originalAmount: number,
  ): PriceCalculationResult {
    let totalDiscount = 0;
    let totalAfterDiscounts = originalAmount;
    const basketDiscounts: number[] = [];

    promotions.forEach((promotion) => {
      const discount = promotion.apply(products, totalAfterDiscounts);

      if (discount > 0) {
        totalDiscount += discount;
        totalAfterDiscounts -= discount;
        basketDiscounts.push(discount);
      }
    });

    const finalAmount = originalAmount - totalDiscount;

    return {
      originalAmount,
      finalAmount,
      basketDiscounts,
    };
  }
}
