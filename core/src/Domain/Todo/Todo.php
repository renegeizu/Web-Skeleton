<?php declare(strict_types=1);

namespace App\Domain\Todo;

use Carbon\Carbon;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(
 *     name="todo",
 *     schema="app"
 * )
 */
class Todo
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="NONE")
     * @ORM\Column(name="id", type="guid")
     *
     * @var string
     */
    protected $id;

    /**
     * @ORM\Column(name="content", type="string")
     *
     * @var string
     */
    private $content;

    /**
     * @ORM\Column(name="created_at", type="datetime", options={"default"="now()"})
     *
     * @var Carbon
     */
    private $createdAt;

    public static function create(string $content): self
    {
        return new self(TodoId::create(), $content);
    }

    public function __construct(TodoId $id, string $content)
    {
        $this->id = $id->id();
        $this->content = $content;
        $this->createdAt = Carbon::now();
    }

    public function id(): TodoId
    {
        return TodoId::from($this->id);
    }

    public function content(): string
    {
        return $this->content;
    }

    public function createdAt(): Carbon
    {
        return $this->createdAt;
    }
}
