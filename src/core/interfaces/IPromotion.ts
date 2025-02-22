import { Product } from '../models/Product';

export interface IPromotion {
  getExecutionOrder(): number;
  apply(products: Product[], totalAfterDiscounts?: number): number;
}
