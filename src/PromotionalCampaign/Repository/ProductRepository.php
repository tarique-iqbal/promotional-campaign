<?php

declare(strict_types=1);

namespace PromotionalCampaign\Repository;

use PromotionalCampaign\Entity\Product;

class ProductRepository implements ProductRepositoryInterface
{
    private array $products;

    public function __construct(string $productDataSourceFile)
    {
        $jsonString = file_get_contents($productDataSourceFile, true);
        $dataSource = json_decode($jsonString, true);

        foreach ($dataSource['product'] as $item) {
            $product = new Product();
            $product->setCode($item['code']);
            $product->setName($item['name']);
            $product->setPrice((float) $item['price']);
            $product->setReducePrice(
                $item['reduce_price'] === 'NULL' ? null : (float) $item['reduce_price']
            );

            $this->products[$item['code']] = $product;
        }
    }

    public function findByCode(string $code): Product
    {
        return $this->products[$code];
    }
}
