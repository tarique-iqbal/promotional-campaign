import { BasketService } from '../../../src/core/services/BasketService';
import { Product } from '../../../src/core/models/Product';

describe('BasketService', () => {
  let basketService: BasketService;

  beforeEach(() => {
    basketService = new BasketService();
  });

  it('should add products to the basket', () => {
    const product: Product = { id: '1', name: 'Headphones', price: 25 };
    basketService.addProduct(product);
    basketService.addProduct(product);

    expect(basketService.getProducts()).toEqual([product, product]);
  });

  it('should remove a product from the basket', () => {
    const product: Product = { id: '1', name: 'Headphones', price: 25 };
    basketService.addProduct(product);
    basketService.removeProduct('1');

    expect(basketService.getProducts()).toEqual([]);
  });

  it('should clear the basket', () => {
    const product: Product = { id: '1', name: 'Headphones', price: 25 };
    basketService.addProduct(product);
    basketService.addProduct(product);
    basketService.clearBasket();

    expect(basketService.getProducts()).toEqual([]);
  });
});
