<?php

declare(strict_types=1);

namespace Tests\Integration;

use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;
use PromotionalCampaign\Factory\ContainerFactory;
use PromotionalCampaign\PromotionalCampaignApplication;

class PromotionalCampaignApplicationTest extends TestCase
{
    protected PromotionalCampaignApplication $promotionalCampaignApplication;

    protected function setUp(): void
    {
        $config = include BASE_DIR . '/config/parameters_test.php';
        $container = (new ContainerFactory($config))->create();

        $this->promotionalCampaignApplication = $container['PromotionalCampaignApplication'];
    }

    public static function itemsInBasketProvider(): array
    {
        return [
            [
                ['001', '002', '003'], '€29.65'
            ],
            [
                ['002', '001', '002'], '€9.93'
            ],
            [
                ['002', '001', '002', '003'], '€31.44'
            ],
            [
                ['001', '002', '002', '003', '003'], '€53.94'
            ],
        ];
    }

    #[DataProvider('itemsInBasketProvider')]
    public function testRun(array $itemsInBasket, string $expectedPrice): void
    {
        $this->expectOutputString($expectedPrice . PHP_EOL);

        $this->promotionalCampaignApplication->run($itemsInBasket);
    }
}
