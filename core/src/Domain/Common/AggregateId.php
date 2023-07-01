<?php

declare(strict_types=1);

namespace App\Domain\Common;

use Ramsey\Uuid\Uuid;
use Webmozart\Assert\Assert;

class AggregateId
{
    protected string $id;

    private static $uuid;

    public static function create(): self
    {
        $uuid = self::$uuid ?: Uuid::uuid4()->toString();

        return new static($uuid);
    }

    public static function from(string $id): self
    {
        return new static($id);
    }

    public function __construct(string $id)
    {
        Assert::uuid($id);

        $this->id = $id;
    }

    public function id(): string
    {
        return $this->id;
    }

    public function isEqual(self $id): bool
    {
        return $this->id === $id->id;
    }

    public function __toString()
    {
        return $this->id();
    }

    public static function willUse(string $uuid): void
    {
        self::$uuid = $uuid;
    }

    public static function clearMock(): void
    {
        self::$uuid = null;
    }
}
