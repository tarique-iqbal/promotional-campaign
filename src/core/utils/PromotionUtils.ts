import { IPromotion } from '../interfaces/IPromotion';

export function sortPromotions(promotions: IPromotion[]): IPromotion[] {
  return promotions.sort(
    (a, b) => a.getExecutionOrder() - b.getExecutionOrder(),
  );
}
