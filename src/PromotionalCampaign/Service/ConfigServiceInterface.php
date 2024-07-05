<?php

declare(strict_types=1);

namespace PromotionalCampaign\Service;

interface ConfigServiceInterface
{
    public function getProductDataSourceFile(): string;

    public function getErrorLogFile(): string;
}
