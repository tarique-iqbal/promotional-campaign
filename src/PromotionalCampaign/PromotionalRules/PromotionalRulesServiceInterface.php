<?php

declare(strict_types=1);

namespace PromotionalCampaign\PromotionalRules;

interface PromotionalRulesServiceInterface
{
    public const PRODUCT_CODE_PIZZA = '002';

    public function apply(): void;

    public static function getOrder(): int;
}
