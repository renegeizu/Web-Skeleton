<?php

declare(strict_types=1);

namespace App\Api\Behat\Context\Api;

use App\Domain\Todo\Todo;
use App\Domain\Todo\TodoRepository;
use Behat\Behat\Context\Context;
use Behat\Gherkin\Node\TableNode;
use Doctrine\ORM\EntityManagerInterface;

final class TodoContext implements Context
{
    private TodoRepository $todos;

    private EntityManagerInterface $manager;

    public function __construct(TodoRepository $todos, EntityManagerInterface $manager)
    {
        $this->todos = $todos;
        $this->manager = $manager;
    }

    /**
     * @Given I have the tasks:
     */
    public function iHaveTheTasks(TableNode $table): void
    {
        foreach ($table->getColumnsHash() as $row) {
            $this->todos->add(Todo::create($row['content']));
        }

        $this->manager->flush();
    }
}
