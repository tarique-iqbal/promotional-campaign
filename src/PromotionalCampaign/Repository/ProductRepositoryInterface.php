<?php

declare(strict_types=1);

namespace PromotionalCampaign\Repository;

use PromotionalCampaign\Entity\Product;

interface ProductRepositoryInterface
{
    public function findByCode(string $code): Product;
}
