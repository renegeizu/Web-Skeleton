<?php

namespace spec\App\Domain\Todo;

use App\Domain\Todo\TodoId;
use Carbon\Carbon;
use PhpSpec\ObjectBehavior;

class TodoSpec extends ObjectBehavior
{
    private const ID = '2876e188-1aef-4516-8301-c58e2fd2bc5a';

    public function let()
    {
        Carbon::setTestNow(Carbon::create(2020, 5, 21, 12));
        TodoId::willUse(self::ID);

        $this->beConstructedThrough('create', ['Plant a tree']);
    }

    public function it_has_an_id()
    {
        $this->id()->shouldBeLike(TodoId::from(self::ID));
    }

    public function it_has_a_content()
    {
        $this->content()->shouldReturn('Plant a tree');
    }

    public function it_has_a_creation_date()
    {
        $this->createdAt()->shouldBeLike(Carbon::create(2020, 5, 21, 12));
    }
}
