import { BuyOneGetOneFreePromotion } from '../../../src/core/promotions/BuyOneGetOneFreePromotion';
import { Product } from '../../../src/core/models/Product';

describe('BuyOneGetOneFreeCumulativePromotion', () => {
  const productId = '123';
  let promotion: BuyOneGetOneFreePromotion;

  beforeEach(() => {
    promotion = new BuyOneGetOneFreePromotion(productId);
  });

  it('should return 0 discount if only 1 product is purchased', () => {
    const products = [new Product(productId, 'Printer', 100)];
    expect(promotion.apply(products)).toBe(0);
  });

  it('should apply discount equal to 1 item price when 2 products are purchased', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
    ];
    expect(promotion.apply(products)).toBe(100);
  });

  it('should apply discount equal to 1 item price when 3 products are purchased', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
    ];
    expect(promotion.apply(products)).toBe(100);
  });

  it('should apply discount equal to 2 item prices when 4 products are purchased', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
    ];
    expect(promotion.apply(products)).toBe(200);
  });

  it('should apply discount equal to 2 item prices when 5 products are purchased', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
    ];
    expect(promotion.apply(products)).toBe(200);
  });

  it('should apply discount equal to 3 item prices when 6 products are purchased', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
    ];
    expect(promotion.apply(products)).toBe(300);
  });

  it('should apply discount only to the specified product ID', () => {
    const products = [
      new Product(productId, 'Printer', 100),
      new Product(productId, 'Printer', 100),
      new Product('456', 'Shirt', 50),
      new Product('656', 'Trimmer', 50),
    ];
    expect(promotion.apply(products)).toBe(100);
  });

  it('should return 0 discount if no matching product is found', () => {
    const products = [
      new Product('456', 'Shirt', 50),
      new Product('789', 'Trimmer', 30),
    ];
    expect(promotion.apply(products)).toBe(0);
  });
});
