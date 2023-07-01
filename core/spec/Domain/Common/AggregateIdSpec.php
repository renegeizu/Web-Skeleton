<?php

namespace spec\App\Infrastructure\Helper;

use App\Domain\Common\AggregateId;
use PhpSpec\ObjectBehavior;
use Ramsey\Uuid\Uuid;

class AggregateIdSpec extends ObjectBehavior
{
    public function let()
    {
        $this->beConstructedThrough('create');
    }

    public function it_extends_aggregate_id()
    {
        $this->shouldHaveType(AggregateId::class);
    }

    public function it_can_be_created()
    {
        $this->id()->shouldBeAnUuid();
    }

    public function it_can_be_created_from_an_uuid()
    {
        $this->beConstructedThrough('from', ['aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee']);

        $this->id()->shouldReturn('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    }

    public function it_has_an_id()
    {
        $this->beConstructedWith('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');

        $this->id()->shouldReturn('aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee');
    }

    public function its_id_has_to_be_an_uuid()
    {
        $this->beConstructedWith('not-un-uuid');

        $this->shouldThrow(\InvalidArgumentException::class)->duringInstantiation();
    }

    public function getMatchers(): array
    {
        return [
            'beAnUuid' => fn ($value) => Uuid::isValid($value),
        ];
    }
}
