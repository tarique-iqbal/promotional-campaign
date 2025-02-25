import { Product } from '../models/Product';

export interface IBasketService {
  addProduct(product: Product): void;
  removeProduct(productId: string): void;
  getProducts(): Product[];
  clearBasket(): void;
}
