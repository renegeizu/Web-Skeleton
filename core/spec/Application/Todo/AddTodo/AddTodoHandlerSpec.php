<?php

namespace spec\App\Application\Todo\AddTodo;

use App\Application\Todo\AddTodo\AddTodoCommand;
use App\Domain\Todo\Todo;
use App\Domain\Todo\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use League\Fractal\Resource\ResourceInterface;
use PhpSpec\ObjectBehavior;
use Prophecy\Argument;

class AddTodoHandlerSpec extends ObjectBehavior
{
    public function let(TodoRepository $todos, AddTodoCommand $command)
    {
        $command->content()->willReturn('Write a book');

        $this->beConstructedWith($todos);
    }

    public function it_handles_add_todo_commands(TodoRepository $todos, AddTodoCommand $command)
    {
        $this->__invoke($command)->shouldReturnAnInstanceOf(ResourceInterface::class);

        $todos->add(Argument::type(Todo::class))->shouldHaveBeenCalledOnce();
    }
}
