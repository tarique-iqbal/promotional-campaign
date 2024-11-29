<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

class CurrencyManager implements CurrencyManagementInterface
{
    private const CURRENCY_SYMBOL = '€';

    public function getCurrencySymbol(): string
    {
        return self::CURRENCY_SYMBOL;
    }
}
