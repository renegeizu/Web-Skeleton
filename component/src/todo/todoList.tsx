import React, { useContext } from "react";
import { context } from "../state/todo/provider";
import Loading from "../global/loading";

export const BaseTodoList = ({ list = [], loaded = false }: Props) => {
  if (!loaded) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      {list.map((current, index) => (
        <li key={index}>{current}</li>
      ))}
    </React.Fragment>
  );
};

const TodoList = () => {
  const { list, loaded } = useContext(context);

  return <BaseTodoList list={list} loaded={loaded} />;
};

type Props = {
  list: string[];
  loaded: boolean;
};

export default TodoList;
