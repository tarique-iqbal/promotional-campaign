<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

interface CurrencyManagementInterface
{
    public function getCurrencySymbol(): string;
}
