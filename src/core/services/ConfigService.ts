export class ConfigService {
  private readonly config = new Map<string, number | string>();

  constructor() {
    this.config.set('DISCOUNT_AMOUNT', 5);
    this.config.set('MINIMUM_SPEND_AMOUNT', 50);
    this.config.set('BOGOF_PRODUCT_ID', '3');
    this.config.set('BUY_OVER_ONE_PRODUCT_ID', '2');
  }

  get<T>(key: string): T {
    return this.config.get(key) as T;
  }
}
