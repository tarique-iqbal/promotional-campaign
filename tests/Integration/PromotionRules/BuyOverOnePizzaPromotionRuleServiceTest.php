<?php

declare(strict_types=1);

namespace Tests\Integration\PromotionRules;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use PromotionalCampaign\Container\ContainerFactory;
use PromotionalCampaign\PromotionalRules\BuyOverOnePizzaPromotionalRulesService;
use PromotionalCampaign\PromotionalRules\PromotionalRulesServiceInterface;
use PromotionalCampaign\Service\BasketServiceInterface;

class BuyOverOnePizzaPromotionRuleServiceTest extends TestCase
{
    protected BasketServiceInterface $basketService;

    protected PromotionalRulesServiceInterface $buyOverOnePizzaPromotionRuleService;

    protected function setUp(): void
    {
        $config = include BASE_DIR . '/config/parameters_test.php';
        $container = (new ContainerFactory($config))->create();

        $this->basketService = $container['BasketService'];
        $this->buyOverOnePizzaPromotionRuleService = new BuyOverOnePizzaPromotionalRulesService(
            $this->basketService,
            $container['ProductRepository']
        );
    }

    public static function itemsInBasketProvider(): array
    {
        return [
            [
                ['002'], 5.99
            ],
            [
                ['002', '002', '002'], 11.97
            ],
            [
                ['002', '002', '003'], 32.98
            ],
        ];
    }

    #[DataProvider('itemsInBasketProvider')]
    public function testApply(array $products, float $expectedPrice): void
    {
        $this->addProductToBasket($products);

        $this->buyOverOnePizzaPromotionRuleService->apply();

        $price = round($this->basketService->getTotalPrice(), 2);

        $this->assertSame($expectedPrice, $price);
    }

    private function addProductToBasket(array $productCodes): void
    {
        foreach ($productCodes as $productCode) {
            $this->basketService->addToBasket($productCode);
        }
    }
}
