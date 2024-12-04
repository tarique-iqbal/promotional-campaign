<?php

declare(strict_types=1);

namespace Tests\Integration\Service;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use PromotionalCampaign\Container\ContainerFactory;
use PromotionalCampaign\Service\BasketServiceInterface;

class BasketServiceTest extends TestCase
{
    protected BasketServiceInterface $basketService;

    protected function setUp(): void
    {
        $config = include BASE_DIR . '/config/parameters_test.php';
        $container = (new ContainerFactory($config))->create();

        $this->basketService = $container['BasketService'];
    }

    public static function itemsInBasketProvider(): array
    {
        return [
            [
                ['002'], 5.99
            ],
            [
                ['002', '002', '002'], 17.97
            ],
            [
                ['002', '002', '003', '003'], 61.98
            ],
        ];
    }

    #[DataProvider('itemsInBasketProvider')]
    public function testGetTotalPriceWithoutPromotion(array $products, float $expectedPrice): void
    {
        $this->addProductToBasket($products);

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
