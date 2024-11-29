<?php

declare(strict_types=1);

namespace PromotionalCampaign;

use PromotionalCampaign\Factory\PromotionalRulesFactory;
use PromotionalCampaign\Service\BasketServiceInterface;
use PromotionalCampaign\Service\CurrencyManagementInterface;
use PromotionalCampaign\Service\PromotionEngineServiceInterface;
use ReflectionException;

final readonly class PromotionalCampaignApplication
{
    public function __construct(
        private BasketServiceInterface $basketService,
        private CurrencyManagementInterface $currencyManager,
        private PromotionalRulesFactory $promotionRulesFactory,
        private PromotionEngineServiceInterface $promotionEngineService
    ) {
    }

    /**
     * @throws ReflectionException
     */
    public function run(array $itemsInBasket): void
    {
        foreach ($itemsInBasket as $productCode) {
            $this->basketService->addToBasket($productCode);
        }

        $this->runPromotion();

        echo $this->currencyManager->getCurrencySymbol()
            . round($this->basketService->getTotalPrice(), 2)
            . PHP_EOL;
    }

    /**
     * @throws ReflectionException
     */
    private function runPromotion(): void
    {
        $promotionRules = $this->promotionRulesFactory->create();
        $this->promotionEngineService->setRules($promotionRules);
        $this->promotionEngineService->process();
    }
}
