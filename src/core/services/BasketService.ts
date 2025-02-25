import { injectable } from 'inversify';

import { Product } from '../models/Product';
import { IBasketService } from '../interfaces/IBasketService';

@injectable()
export class BasketService implements IBasketService {
  private products: Product[] = [];

  addProduct(product: Product): void {
    this.products.push(product);
  }

  removeProduct(productId: string): void {
    this.products = this.products.filter((product) => product.id !== productId);
  }

  getProducts(): Product[] {
    return this.products;
  }

  clearBasket(): void {
    this.products = [];
  }
}
