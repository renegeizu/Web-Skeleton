<?php

declare(strict_types=1);

namespace App\Domain\Todo;

use Doctrine\ORM\EntityManagerInterface;

class TodoRepository
{
    private EntityManagerInterface $manager;

    public function __construct(EntityManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    public function add(Todo $todo): void
    {
        $this->manager->persist($todo);
    }
}
