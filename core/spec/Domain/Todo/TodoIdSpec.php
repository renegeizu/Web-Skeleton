<?php

namespace spec\App\Domain\Todo;

use App\Domain\Common\AggregateId;
use PhpSpec\ObjectBehavior;

class TodoIdSpec extends ObjectBehavior
{
    public function let()
    {
        $this->beConstructedThrough('create');
    }

    public function it_extends_aggregate_id()
    {
        $this->shouldHaveType(AggregateId::class);
    }
}
