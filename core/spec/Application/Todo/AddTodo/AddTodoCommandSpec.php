<?php

namespace spec\App\Application\Todo\AddTodo;

use PhpSpec\ObjectBehavior;

class AddTodoCommandSpec extends ObjectBehavior
{
    public function let()
    {
        $this->beConstructedWith('Write a book');
    }

    public function it_has_a_content()
    {
        $this->content()->shouldReturn('Write a book');
    }
}
