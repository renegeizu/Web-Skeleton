<?php declare(strict_types=1);

namespace App\Api\Controller;

use App\Domain\Todo\TodoProvider;
use League\Fractal\Manager;
use OpenApi\Annotations as OA;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class TodosGetController extends AbstractController
{
    private TodoProvider $provider;

    private Manager $manager;

    public function __construct(TodoProvider $provider, Manager $manager)
    {
        $this->provider = $provider;
        $this->manager = $manager;
    }

    /**
     * @Route("/todos", name="todo_get", methods={"GET"})
     * @OA\Response(
     *     response=200,
     *     description="Returns all the todos",
     *     @OA\JsonContent(
     *         type="object",
     *         @OA\Property(
     *             property="data",
     *             type="array",
     *             @OA\Items(
     *                 type="object",
     *                 @OA\Property(
     *                     property="content",
     *                     type="string",
     *                     example="Plant a tree",
     *                 ),
     *                 @OA\Property(
     *                     property="id",
     *                     type="string",
     *                     example="c47ea289-1b38-477a-bbbc-0b182140fed1",
     *                 ),
     *                 @OA\Property(
     *                     property="created_at",
     *                     type="string",
     *                     example="2020-10-05 12:09:37.530613",
     *                 ),
     *             ),
     *         ),
     *     ),
     * )
     * @OA\Tag(name="Todo")
     */
    public function __invoke()
    {
        return $this->json($this->manager->createData($this->provider->all()));
    }
}
