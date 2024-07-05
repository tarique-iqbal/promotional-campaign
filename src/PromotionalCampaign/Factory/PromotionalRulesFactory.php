<?php

declare(strict_types=1);

namespace PromotionalCampaign\Factory;

use DirectoryIterator;
use PromotionalCampaign\PromotionalRules\PromotionalRulesServiceInterface;
use PromotionalCampaign\Repository\ProductRepositoryInterface;
use PromotionalCampaign\Service\BasketServiceInterface;
use ReflectionClass;
use ReflectionException;

readonly class PromotionalRulesFactory
{
    public function __construct(
        private BasketServiceInterface $basketService,
        private ProductRepositoryInterface $productRepository
    ) {
    }

    /**
     * @throws ReflectionException
     */
    public function create(): array
    {
        $promotionRulesClasses = $this->getPromotionRulesClasses();

        $promotionRules = [];
        foreach ($promotionRulesClasses as $class) {
            $object = new $class($this->basketService, $this->productRepository);
            if ($object instanceof PromotionalRulesServiceInterface) {
                $promotionRules[] = $object;
            }
        }

        return $this->sortPromotionRules($promotionRules);
    }

    /**
     * @throws ReflectionException
     */
    private function getPromotionRulesClasses(): array
    {
        $promotionRulesClasses = [];
        foreach (new DirectoryIterator(dirname(__DIR__) . '/PromotionalRules/') as $fileInfo) {
            if ($fileInfo->isFile() && $fileInfo->getExtension() === 'php') {
                $className = 'PromotionalCampaign\\PromotionalRules\\' . $fileInfo->getBasename('.php');
                $reflection = new ReflectionClass($className);
                if ($reflection->isInstantiable()) {
                    $promotionRulesClasses[] = $className;
                }
            }
        }

        return $promotionRulesClasses;
    }

    private function sortPromotionRules(array $promotionRules): array
    {
        usort(
            $promotionRules,
            static function (PromotionalRulesServiceInterface $a, PromotionalRulesServiceInterface $b) {
                return $a::getOrder() - $b::getOrder();
            }
        );

        return $promotionRules;
    }
}
