<?php

declare(strict_types=1);

namespace Tests\Unit\Repository;

use bovigo\vfs\vfsDirectory;
use bovigo\vfs\vfsStream;
use PHPUnit\Framework\TestCase;
use PromotionalCampaign\Entity\Product;
use PromotionalCampaign\Repository\ProductRepository;

class ProductRepositoryTest extends TestCase
{
    private vfsDirectory $root;

    protected function setUp(): void
    {
        $structure = [
            'data' => [
                'product.json' => '{
                    "product": {
                        "1": {
                            "code": "001",
                            "name": "Curry Sauce",
                            "price": "1.95",
                            "reduce_price": "NULL"
                        }
                    }
                }'
            ]
        ];

        $this->root = vfsStream::setup(sys_get_temp_dir(), null, $structure);
    }

    public function testFindByCode()
    {
        $productRepository = new ProductRepository(
            $this->root->url() . '/data/product.json'
        );

        $product = $productRepository->findByCode('001');

        $this->assertInstanceOf(Product::class, $product);
    }
}
