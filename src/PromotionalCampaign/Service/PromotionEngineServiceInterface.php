<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

use PromotionalCampaign\PromotionalRules\PromotionalRulesServiceInterface;

interface PromotionEngineServiceInterface
{
    /**
     * @param PromotionalRulesServiceInterface[] $promotionRules
     */
    public function setRules(array $promotionRules): void;

    public function process(): void;
}
