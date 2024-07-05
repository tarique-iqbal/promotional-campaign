<?php

declare(strict_types=1);

namespace PromotionalCampaign\PromotionalRules;

use PromotionalCampaign\Service\BasketServiceInterface;

readonly class SpendOverThirtyPromotionalRulesService implements PromotionalRulesServiceInterface
{
    private const ORDER = 2;

    private const SPEND_OVER_AMOUNT = 30;

    public function __construct(private BasketServiceInterface $basketService)
    {
    }

    public function apply(): void
    {
        $totalPrice = $this->basketService->getTotalPrice();

        if ($totalPrice > self::SPEND_OVER_AMOUNT) {
            $reduceAmount = ($totalPrice * 10) / 100;
            $this->basketService->decreaseTotalPrice($reduceAmount);
        }
    }

    public static function getOrder(): int
    {
        return self::ORDER;
    }
}
