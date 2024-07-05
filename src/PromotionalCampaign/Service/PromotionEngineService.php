<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

use PromotionalCampaign\PromotionalRules\PromotionalRulesServiceInterface;

class PromotionEngineService implements PromotionEngineServiceInterface
{
    /**
     * @var PromotionalRulesServiceInterface[]
     */
    private array $promotionRules;

    /**
     * @param PromotionalRulesServiceInterface[] $promotionRules
     */
    public function setRules(array $promotionRules): void
    {
        $this->promotionRules = $promotionRules;
    }

    public function process(): void
    {
        foreach ($this->promotionRules as $promotionRule) {
            $promotionRule->apply();
        }
    }
}
