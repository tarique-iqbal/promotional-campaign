import 'reflect-metadata';
import { BuyOverOneProductPromotion } from '../../../src/core/promotions/BuyOverOneProductPromotion';
import { Product } from '../../../src/core/models/Product';

describe('BuyOverOneProductPromotion', () => {
  const applicableProductId = '3';
  let promotion: BuyOverOneProductPromotion;

  beforeEach(() => {
    promotion = new BuyOverOneProductPromotion(applicableProductId);
  });

  it('should return 0 if only one product is purchased', () => {
    const products: Product[] = [{ id: '3', name: 'Shirt', price: 10 }];
    expect(promotion.apply(products)).toBe(0);
  });

  it('should apply discount if more than one product is purchased', () => {
    const products: Product[] = [
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
    ];
    expect(promotion.apply(products)).toBe(3);
  });

  it('should not apply discount to other products', () => {
    const products: Product[] = [
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
      { id: '4', name: 'Pen', price: 15 },
    ];
    expect(promotion.apply(products)).toBe(0);
  });

  it('should apply discount correctly for multiple eligible products', () => {
    const products: Product[] = [
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
      { id: '3', name: 'Shirt', price: 10, reducePrice: 8.5 },
    ];
    expect(promotion.apply(products)).toBe(4.5);
  });
});
