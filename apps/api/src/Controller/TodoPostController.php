<?php declare(strict_types=1);

namespace App\Api\Controller;

use App\Application\Todo\AddTodo\AddTodoCommand;
use League\Fractal\Manager;
use OpenApi\Annotations as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Messenger\MessageBusInterface;
use Symfony\Component\Messenger\Stamp\HandledStamp;
use Symfony\Component\Routing\Annotation\Route;

class TodoPostController extends AbstractController
{
    private Manager $manager;

    private MessageBusInterface $commandBus;

    public function __construct(Manager $manager, MessageBusInterface $commandBus)
    {
        $this->manager = $manager;
        $this->commandBus = $commandBus;
    }

    /**
     * @Route("/todos", name="todo_post", methods={"POST"})
     * @OA\RequestBody(
     *     description="Task description",
     *     required=true,
     *     @OA\JsonContent(
     *         @OA\Property(
     *             property="content",
     *             type="string",
     *             example="Plant a tree",
     *         ),
     *     ),
     * )
     * @OA\Response(
     *     response=200,
     *     description="Returns the task created",
     *     @OA\JsonContent(
     *         type="object",
     *         @OA\Property(
     *             property="data",
     *             type="object",
     *             @OA\Property(
     *                 property="content",
     *                 type="string",
     *                 example="Plant a tree",
     *             ),
     *             @OA\Property(
     *                 property="id",
     *                 type="string",
     *                 example="c47ea289-1b38-477a-bbbc-0b182140fed1",
     *             ),
     *             @OA\Property(
     *                 property="created_at",
     *                 type="string",
     *                 example="2020-10-05 12:09:37.530613",
     *             ),
     *         ),
     *     ),
     * )
     * )
     * @OA\Tag(name="Todo")
     */
    public function __invoke(Request $request)
    {
        $content = $request->request->get('content');

        if (empty($content)) {
            throw new BadRequestHttpException('Todo content can not be empty');
        }

        $envelope = $this->commandBus->dispatch(new AddTodoCommand($content));
        /** @var HandledStamp $handledStamp */
        $handledStamp = $envelope->last(HandledStamp::class);

        return $this->json($this->manager->createData($handledStamp->getResult()));
    }
}
