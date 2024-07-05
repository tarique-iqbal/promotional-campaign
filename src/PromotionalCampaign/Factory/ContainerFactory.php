<?php

declare(strict_types=1);

namespace PromotionalCampaign\Factory;

use Pimple\Container;
use PromotionalCampaign\PromotionalCampaignApplication;
use PromotionalCampaign\Repository\ProductRepository;
use PromotionalCampaign\Service\BasketService;
use PromotionalCampaign\Service\ConfigService;
use PromotionalCampaign\Service\PromotionEngineService;

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

        $container['PromotionalCampaignApplication'] = function (Container $c) {
            return new PromotionalCampaignApplication(
                $c['BasketService'],
                $c['PromotionalRulesFactory'],
                $c['PromotionEngineService']
            );
        };

        return $container;
    }
}
