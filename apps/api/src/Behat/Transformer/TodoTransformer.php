<?php declare(strict_types=1);

namespace App\Api\Behat\Transformer;

use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;

class TodoTransformer implements Context
{
    /**
     * @Transform table:content
     */
    public function todoResults(TableNode $table): array
    {
        $results = [];

        foreach ($table->getHash() as $row) {
            $results[] = [
                'content' => $row['content name'],
            ];
        }

        return $results;
    }
}
