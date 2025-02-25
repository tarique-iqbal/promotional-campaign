import { PriceCalculationResult } from '../models/PriceCalculationResult';
import { Product } from '../models/Product';
import { IPromotion } from './IPromotion';

export interface ICheckoutService {
  checkout(
    products: Product[],
    promotions: IPromotion[],
  ): PriceCalculationResult;
}
