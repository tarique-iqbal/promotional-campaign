import { injectable } from 'inversify';

import { IPromotion } from '../interfaces/IPromotion';
import { Product } from '../models/Product';

@injectable()
export class BuyOverOneProductPromotion implements IPromotion {
  private static readonly EXECUTION_ORDER = 2;

  constructor(private readonly applicableProductId: string) {}

  getExecutionOrder(): number {
    return BuyOverOneProductPromotion.EXECUTION_ORDER;
  }

  apply(products: Product[]): number {
    const eligibleProducts = products.filter(
      (product) => product.id === this.applicableProductId,
    );

    if (eligibleProducts.length <= 1) return 0;

    if (!eligibleProducts[0].reducePrice) {
      throw new Error('Reduced price must contain a numeric value.');
    }

    const discountPerUnit =
      eligibleProducts[0].price - eligibleProducts[0].reducePrice!;

    return eligibleProducts.length * discountPerUnit;
  }
}
