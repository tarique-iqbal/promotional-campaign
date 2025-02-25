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
    const calculationHistory: string[] = [];

    promotions.forEach((promotion) => {
      const discount = promotion.apply(products, totalAfterDiscounts);

      if (discount > 0) {
        totalDiscount += discount;
        totalAfterDiscounts -= discount;
        calculationHistory.push(
          `Promotion ${promotion.getExecutionOrder()}: -$${discount}`,
        );
      }
    });

    const finalAmount = originalAmount - totalDiscount;

    return {
      originalAmount,
      finalAmount,
      calculationHistory,
    };
  }
}
