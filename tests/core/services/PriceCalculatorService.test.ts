import { PriceCalculatorService } from '../../../src/core/services/PriceCalculatorService';
import { Product } from '../../../src/core/models/Product';
import { FixedDiscountPromotion } from '../../../src/core/promotions/FixedDiscountPromotion';
import { IPromotion } from '../../../src/core/interfaces/IPromotion';
import { BuyOneGetOneFreePromotion } from '../../../src/core/promotions/BuyOneGetOneFreePromotion';
import { BuyOverOneProductPromotion } from '../../../src/core/promotions/BuyOverOneProductPromotion';

function sortPromotions(promotions: IPromotion[]): IPromotion[] {
  return promotions.sort(
    (a, b) => a.getExecutionOrder() - b.getExecutionOrder(),
  );
}

describe('PriceCalculatorService', () => {
  let priceCalculatorService: PriceCalculatorService;

  beforeEach(() => {
    priceCalculatorService = new PriceCalculatorService();
  });

  it('should calculate the original amount', () => {
    const products = [
      new Product('1', 'Mouse', 40),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('3', 'Pen', 30),
      new Product('3', 'Pen', 30),
    ];

    const originalAmount =
      priceCalculatorService.calculateOriginalAmount(products);
    expect(originalAmount).toBe(150);
  });

  it('should calculate original amount, discounts, and final amount', () => {
    const products = [
      new Product('1', 'Mouse', 40),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('3', 'Pen', 30),
      new Product('3', 'Pen', 30),
    ];

    const promotions = [
      new BuyOverOneProductPromotion('2'), // 7.5 off
      new FixedDiscountPromotion(5, 40), // 5 off
      new BuyOneGetOneFreePromotion('3'), // 30 off
    ];
    const sortedPromotions = sortPromotions(promotions);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
    );

    expect(result.originalAmount).toBe(175);
    expect(result.finalAmount).toBe(132.5);
    expect(result.calculationHistory).toEqual([
      'Promotion 1: -$30',
      'Promotion 2: -$7.5',
      'Promotion 3: -$5',
    ]);
  });

  it('should calculate original amount, two different discounts, and final amount', () => {
    const products = [
      new Product('1', 'Mouse', 40),
      new Product('2', 'Shirt', 25, 22.5),
      new Product('2', 'Shirt', 25, 22.5),
    ];

    const promotions = [
      new BuyOverOneProductPromotion('2'), // 5 off
      new FixedDiscountPromotion(5, 40), // 5 off
      new BuyOneGetOneFreePromotion('3'), // No discount
    ];
    const sortedPromotions = sortPromotions(promotions);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
    );

    expect(result.originalAmount).toBe(90);
    expect(result.finalAmount).toBe(80);
    expect(result.calculationHistory).toEqual([
      'Promotion 2: -$5',
      'Promotion 3: -$5',
    ]);
  });

  it('should calculate original amount, only fixed discount, and final amount', () => {
    const products = [
      new Product('1', 'Mouse', 40),
      new Product('2', 'Shirt', 25, 22.5),
    ];

    const promotions = [
      new BuyOverOneProductPromotion('2'), // No discount
      new FixedDiscountPromotion(5, 40), // 5 off
      new BuyOneGetOneFreePromotion('3'), // No discount
    ];
    const sortedPromotions = sortPromotions(promotions);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
    );

    expect(result.originalAmount).toBe(65);
    expect(result.finalAmount).toBe(60);
    expect(result.calculationHistory).toEqual(['Promotion 3: -$5']);
  });

  it('should return original amount if no promotions apply', () => {
    const products = [new Product('1', 'Product A', 100)];
    const promotions: IPromotion[] = [];

    const result = priceCalculatorService.applyPromotions(products, promotions);

    expect(result.originalAmount).toBe(100);
    expect(result.finalAmount).toBe(100);
    expect(result.calculationHistory).toEqual([]);
  });
});
