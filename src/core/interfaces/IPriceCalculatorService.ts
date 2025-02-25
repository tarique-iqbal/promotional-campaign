import { Product } from '../models/Product';
import { IPromotion } from '../interfaces/IPromotion';
import { PriceCalculationResult } from '../models/PriceCalculationResult';

export interface IPriceCalculatorService {
  calculateOriginalAmount(products: Product[]): number;
  applyPromotions(
    products: Product[],
    promotions: IPromotion[],
    originalAmount: number,
  ): PriceCalculationResult;
}
