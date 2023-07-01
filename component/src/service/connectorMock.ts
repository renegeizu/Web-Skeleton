import connector from "./connector";
import MockAdapter from "axios-mock-adapter";
import { v4 as uuid } from "uuid";

export const todos = [
  { content: "Write a book", id: uuid() },
  { content: "Plant a tree", id: uuid() },
];

export const newTodo = { content: "Have a son", id: uuid() };

const ENDPOINT = "/todos";

const buildConnectorMock = (): MockAdapter => {
  const mock = new MockAdapter(connector);

  mock.onGet(ENDPOINT).reply(() => {
    return [
      200,
      {
        data: [...todos],
      },
    ];
  });

  mock.onPost(ENDPOINT).reply((request) => {
    return [200, { data: { ...JSON.parse(request.data), id: newTodo.id } }];
  });

  return mock;
};

export default buildConnectorMock;
