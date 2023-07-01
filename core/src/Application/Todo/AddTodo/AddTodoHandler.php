<?php declare(strict_types=1);

namespace App\Application\Todo\AddTodo;

use App\Application\Common\MessageHandlerInterface;
use App\Domain\Todo\Todo;
use App\Domain\Todo\TodoRepository;
use League\Fractal\Resource\Item;
use League\Fractal\Resource\ResourceInterface;

class AddTodoHandler implements MessageHandlerInterface
{
    private TodoRepository $todos;

    public function __construct(TodoRepository $todos)
    {
        $this->todos = $todos;
    }

    public function __invoke(AddTodoCommand $command): ResourceInterface
    {
        $todo = Todo::create($command->content());

        $this->todos->add($todo);

        return new Item(
            $todo,
            fn (Todo $todo) => [
                'content' => $todo->content(),
                'created_at' => $todo->createdAt()->toDateTimeString('microsecond'),
                'id' => (string) $todo->id(),
            ],
        );
    }
}
