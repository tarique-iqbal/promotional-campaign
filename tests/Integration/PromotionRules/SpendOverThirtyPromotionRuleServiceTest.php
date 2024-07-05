<?php

declare(strict_types=1);

namespace Tests\Integration\PromotionRules;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use PromotionalCampaign\Factory\ContainerFactory;
use PromotionalCampaign\PromotionalRules\SpendOverThirtyPromotionalRulesService;
use PromotionalCampaign\PromotionalRules\PromotionalRulesServiceInterface;
use PromotionalCampaign\Service\BasketServiceInterface;

class SpendOverThirtyPromotionRuleServiceTest extends TestCase
{
    protected BasketServiceInterface $basketService;

    protected PromotionalRulesServiceInterface $SpendOverThirtyPromotionRuleService;

    protected function setUp(): void
    {
        $config = include BASE_DIR . '/config/parameters_test.php';
        $container = (new ContainerFactory($config))->create();

        $this->basketService = $container['BasketService'];
        $this->SpendOverThirtyPromotionRuleService = new SpendOverThirtyPromotionalRulesService($this->basketService);
    }

    public static function itemsInBasketProvider(): array
    {
        return [
            [
                ['002', '002', '002'], 17.97
            ],
            [
                ['003', '003'], 45.00
            ],
            [
                ['001', '002', '003', '003'], 52.15
            ],
        ];
    }

    #[DataProvider('itemsInBasketProvider')]
    public function testApply(array $products, float $expectedPrice): void
    {
        $this->addProductToBasket($products);

        $this->SpendOverThirtyPromotionRuleService->apply();

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
