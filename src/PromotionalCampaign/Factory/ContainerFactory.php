<?php

declare(strict_types=1);

namespace PromotionalCampaign\Factory;

use Pimple\Container;
use PromotionalCampaign\Repository\ProductRepository;
use PromotionalCampaign\Service\BasketService;
use PromotionalCampaign\Service\ConfigService;

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

        return $container;
    }
}
