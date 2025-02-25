import { PriceCalculatorService } from '../../../src/core/services/PriceCalculatorService';
import { Product } from '../../../src/core/models/Product';
import { FixedDiscountPromotion } from '../../../src/core/promotions/FixedDiscountPromotion';
import { IPromotion } from '../../../src/core/interfaces/IPromotion';
import { BuyOneGetOneFreePromotion } from '../../../src/core/promotions/BuyOneGetOneFreePromotion';
import { BuyOverOneProductPromotion } from '../../../src/core/promotions/BuyOverOneProductPromotion';
import { sortPromotions } from '../../../src/core/utils/PromotionUtils';

describe('PriceCalculatorService', () => {
  let priceCalculatorService: PriceCalculatorService;
  let sortedPromotions: IPromotion[] = [];

  beforeEach(() => {
    priceCalculatorService = new PriceCalculatorService();
    const promotions = [
      new BuyOverOneProductPromotion('2'),
      new FixedDiscountPromotion(5, 40),
      new BuyOneGetOneFreePromotion('3'),
    ];
    sortedPromotions = sortPromotions(promotions);
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

    const originalAmount =
      priceCalculatorService.calculateOriginalAmount(products);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
      originalAmount,
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

    const originalAmount =
      priceCalculatorService.calculateOriginalAmount(products);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
      originalAmount,
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
    const originalAmount =
      priceCalculatorService.calculateOriginalAmount(products);

    const result = priceCalculatorService.applyPromotions(
      products,
      sortedPromotions,
      originalAmount,
    );

    expect(result.originalAmount).toBe(65);
    expect(result.finalAmount).toBe(60);
    expect(result.calculationHistory).toEqual(['Promotion 3: -$5']);
  });

  it('should return original amount if no promotions apply', () => {
    const products = [new Product('1', 'Product A', 100)];
    const promotions: IPromotion[] = [];
    const originalAmount =
      priceCalculatorService.calculateOriginalAmount(products);

    const result = priceCalculatorService.applyPromotions(
      products,
      promotions,
      originalAmount,
    );

    expect(result.originalAmount).toBe(100);
    expect(result.finalAmount).toBe(100);
    expect(result.calculationHistory).toEqual([]);
  });
});
