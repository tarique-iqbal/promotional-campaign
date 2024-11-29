<?php

declare(strict_types=1);

namespace Tests\Integration\Factory;

use PHPUnit\Framework\TestCase;
use Pimple\Container;
use PromotionalCampaign\Factory\ContainerFactory;
use PromotionalCampaign\Factory\PromotionalRulesFactory;
use PromotionalCampaign\Handler\ExceptionHandler;
use PromotionalCampaign\PromotionalCampaignApplication;
use PromotionalCampaign\Repository\ProductRepository;
use PromotionalCampaign\Service\BasketService;
use PromotionalCampaign\Service\ConfigService;
use PromotionalCampaign\Service\CurrencyManagementInterface;
use PromotionalCampaign\Service\PromotionEngineService;

class ContainerFactoryTest extends TestCase
{
    public function testCreate(): void
    {
        $config = include BASE_DIR . '/config/parameters_test.php';

        $container = (new ContainerFactory($config))->create();

        $this->assertInstanceOf(Container::class, $container);
        $this->assertInstanceOf(ConfigService::class, $container['ConfigService']);
        $this->assertInstanceOf(ProductRepository::class, $container['ProductRepository']);
        $this->assertInstanceOf(BasketService::class, $container['BasketService']);
        $this->assertInstanceOf(CurrencyManagementInterface::class, $container['CurrencyManager']);
        $this->assertInstanceOf(PromotionalRulesFactory::class, $container['PromotionalRulesFactory']);
        $this->assertInstanceOf(PromotionEngineService::class, $container['PromotionEngineService']);
        $this->assertInstanceOf(PromotionalCampaignApplication::class, $container['PromotionalCampaignApplication']);
        $this->assertInstanceOf(ExceptionHandler::class, $container['ExceptionHandler']);
    }
}
