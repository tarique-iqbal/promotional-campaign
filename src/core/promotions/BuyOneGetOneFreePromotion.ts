import { injectable } from 'inversify';

import { IPromotion } from '../interfaces/IPromotion';
import { Product } from '../models/Product';

@injectable()
export class BuyOneGetOneFreePromotion implements IPromotion {
  private static readonly EXECUTION_ORDER = 1;

  constructor(private readonly applicableProductId: string) {}

  getExecutionOrder(): number {
    return BuyOneGetOneFreePromotion.EXECUTION_ORDER;
  }

  apply(products: Product[]): number {
    const eligibleProducts = products.filter(
      (p) => p.id === this.applicableProductId,
    );

    const count = eligibleProducts.length;
    if (count < 2) return 0;

    const freeItems = Math.floor(count / 2);
    const discount = freeItems * eligibleProducts[0].price;

    return discount;
  }
}
