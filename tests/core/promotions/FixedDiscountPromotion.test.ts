import { FixedDiscountPromotion } from '../../../src/core/promotions/FixedDiscountPromotion';
import { Product } from '../../../src/core/models/Product';

describe('FixedDiscountPromotion', () => {
  it('should apply fixed discount if minimum spend is met', () => {
    const promotion = new FixedDiscountPromotion(10, 100);
    const products = [
      new Product('1', 'Laptop', 150),
      new Product('2', 'Mouse', 50),
      new Product('2', 'Mouse', 50),
    ];

    expect(promotion.apply(products, 200)).toBe(10);
  });

  it('should not apply discount if minimum spend is not met', () => {
    const promotion = new FixedDiscountPromotion(10, 200);
    const products = [new Product('3', 'Book', 50)];

    expect(promotion.apply(products, 50)).toBe(0);
  });

  it('should throw an error if the basket is empty', () => {
    const promotion = new FixedDiscountPromotion(5, 40);
    const products: Product[] = [];

    expect(() => promotion.apply(products, 0)).toThrow(
      'The basket is empty! It must contain the product.',
    );
  });

  it('should throw an error if the discount amount is greater than the minimum spend', () => {
    const invalidPromotion = new FixedDiscountPromotion(60, 50);
    const productList = [
      new Product('3', 'Book', 30),
      new Product('4', 'T-shirt', 30),
    ];

    expect(() => invalidPromotion.apply(productList, 60)).toThrow(
      'The minimum spend must be greater than the discount amount.',
    );
  });
});
