import { injectable } from 'inversify';

import { IPromotion } from '../interfaces/IPromotion';
import { Product } from '../models/Product';

@injectable()
export class FixedDiscountPromotion implements IPromotion {
  private static readonly EXECUTION_ORDER = 3;

  constructor(
    private readonly discountAmount: number,
    private readonly minimumSpend: number,
  ) {}

  getExecutionOrder(): number {
    return FixedDiscountPromotion.EXECUTION_ORDER;
  }

  apply(products: Product[], totalAfterDiscounts: number): number {
    if (!products.length) {
      throw new Error('The basket is empty! It must contain the product.');
    }

    if (this.discountAmount > this.minimumSpend) {
      throw new Error(
        'The minimum spend must be greater than the discount amount.',
      );
    }

    if (totalAfterDiscounts < this.minimumSpend) {
      return 0;
    }

    return this.discountAmount;
  }
}
