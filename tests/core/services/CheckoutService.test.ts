import { CheckoutService } from '../../../src/core/services/CheckoutService';
import { BasketService } from '../../../src/core/services/BasketService';
import { PriceCalculatorService } from '../../../src/core/services/PriceCalculatorService';
import { FixedDiscountPromotion } from '../../../src/core/promotions/FixedDiscountPromotion';
import { BuyOneGetOneFreePromotion } from '../../../src/core/promotions/BuyOneGetOneFreePromotion';
import { BuyOverOneProductPromotion } from '../../../src/core/promotions/BuyOverOneProductPromotion';
import { Product } from '../../../src/core/models/Product';
import { IPromotion } from '../../../src/core/interfaces/IPromotion';

describe('CheckoutService', () => {
  let basketService: BasketService;
  let priceCalculatorService: PriceCalculatorService;
  let promotions: IPromotion[];
  let checkoutService: CheckoutService;

  beforeEach(() => {
    basketService = new BasketService();
    priceCalculatorService = new PriceCalculatorService();

    promotions = [
      new BuyOverOneProductPromotion('2'),
      new FixedDiscountPromotion(5, 40),
      new BuyOneGetOneFreePromotion('3'),
    ];

    checkoutService = new CheckoutService(
      promotions,
      basketService,
      priceCalculatorService,
    );
  });

  it('should calculate original, discount history, and final amount', () => {
    basketService.addProduct(new Product('1', 'Trouser', 30));
    basketService.addProduct(new Product('2', 'Mouse', 50, 45));
    basketService.addProduct(new Product('2', 'Mouse', 50, 45));
    basketService.addProduct(new Product('3', 'Shirt', 30));
    basketService.addProduct(new Product('3', 'Shirt', 30));

    const result = checkoutService.checkout();

    expect(result.originalAmount).toBe(190);
    expect(result.finalAmount).toBe(145);
    expect(result.basketDiscounts).toEqual([30, 10, 5]);
  });

  it('should throw an error if the basket is empty', () => {
    expect(() => checkoutService.checkout()).toThrow(
      'The basket is empty! It must contain the product.',
    );
  });

  it('should throw an error if the discount amount is greater than the minimum spend', () => {
    promotions = [new FixedDiscountPromotion(200, 100)];
    checkoutService = new CheckoutService(
      promotions,
      basketService,
      priceCalculatorService,
    );

    basketService.addProduct(new Product('1', 'Cheap Product', 150));

    expect(() => checkoutService.checkout()).toThrow(
      'The minimum spend must be greater than the discount amount.',
    );
  });

  it('should return original amount if no promotions are applied', () => {
    promotions = [];
    checkoutService = new CheckoutService(
      promotions,
      basketService,
      priceCalculatorService,
    );

    basketService.addProduct(new Product('1', 'Desk', 300));

    const result = checkoutService.checkout();

    expect(result.originalAmount).toBe(300);
    expect(result.finalAmount).toBe(300);
    expect(result.basketDiscounts).toEqual([]);
  });
});
