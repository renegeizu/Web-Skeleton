<?php declare(strict_types=1);

namespace App\Application\Todo\AddTodo;

class AddTodoCommand
{
    private string $content;

    public function __construct(string $content)
    {
        $this->content = $content;
    }

    public function content(): string
    {
        return $this->content;
    }
}
