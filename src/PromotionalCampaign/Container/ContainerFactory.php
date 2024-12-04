<?php

declare(strict_types=1);

namespace PromotionalCampaign\Container;

use Pimple\Container;
use PromotionalCampaign\Factory\PromotionalRulesFactory;
use PromotionalCampaign\PromotionalCampaignApplication;
use PromotionalCampaign\Repository\ProductRepository;
use PromotionalCampaign\Service\BasketService;
use PromotionalCampaign\Service\ConfigService;
use PromotionalCampaign\Service\CurrencyManager;
use PromotionalCampaign\Service\PromotionEngineService;
use PromotionalCampaign\Handler\ExceptionHandler;

readonly class ContainerFactory
{
    public function __construct(private array $config)
    {
    }

    public function create(): Container
    {
        $container = new Container();

        $container['ConfigService'] = function () {
            return new ConfigService($this->config);
        };

        $container['ProductRepository'] = function (Container $c) {
            return new ProductRepository(
                $c['ConfigService']->getProductDataSourceFile()
            );
        };

        $container['BasketService'] = function (Container $c) {
            return new BasketService(
                $c['ProductRepository'],
            );
        };

        $container['PromotionalRulesFactory'] = function (Container $c) {
            return new PromotionalRulesFactory(
                $c['BasketService'],
                $c['ProductRepository']
            );
        };

        $container['PromotionEngineService'] = function () {
            return new PromotionEngineService();
        };

        $container['CurrencyManager'] = function () {
            return new CurrencyManager();
        };

        $container['PromotionalCampaignApplication'] = function (Container $c) {
            return new PromotionalCampaignApplication(
                $c['BasketService'],
                $c['CurrencyManager'],
                $c['PromotionalRulesFactory'],
                $c['PromotionEngineService']
            );
        };

        $container['ExceptionHandler'] = function (Container $c) {
            return new ExceptionHandler(
                $c['ConfigService']
            );
        };

        return $container;
    }
}
