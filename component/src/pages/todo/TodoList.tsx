import React, { useContext } from "react";
import { context } from "../../state/todo/provider";
import Loading from "../../global/loading";
import Strings from "../../strings";
import consola from "consola";
import { Todo } from "../../models/todo";
interface BaseTodoListProps {
  list: Todo[] | { content: string; id: string | undefined }[];
  loaded: boolean;
}

export const BaseTodoList: React.FC<BaseTodoListProps> = ({ list = [], loaded = false }) => {
  if (!loaded) {
    // Avoid leaving console.log messages, use consola for specific logs
    consola.log("Loading data...");
    consola.info("Loading data...");
    consola.error("Loading data...");
    return <Loading />;
  }

  return (
    <React.Fragment>
      <p>{Strings.t("pages.todo.todoList.title", { number: list.length, plural: list.length > 1 ? "s" : "" })}</p>
      {/* Avoid the use of indexes as keys
        Use only if you are sure about its behavior with @ts-ignore 
        Check more at:  https://reactjs.org/docs/lists-and-keys.html#keys */}
      {list.map(({ id, content }) => (
        <li key={id}>{content}</li>
      ))}
    </React.Fragment>
  );
};

const TodoList: React.FC = () => {
  const { list, loaded } = useContext(context);

  return <BaseTodoList list={list} loaded={loaded} />;
};

export default TodoList;
