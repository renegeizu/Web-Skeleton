import React, { useContext, useState, KeyboardEvent } from "react";
import { context } from "../state/todo/provider";

const ENTER_KEY = 13;

export const BaseNewTodoInput = ({ submit }: Props) => {
  const [current, setCurrent] = useState("");

  const detectSubmitKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.which === ENTER_KEY) {
      submit(current);
      (event.target as HTMLInputElement).value = "";
    }
  };

  return (
    <input
      className="new-todo"
      placeholder="What needs to be done?"
      onKeyDown={detectSubmitKey}
      onChange={(event) => setCurrent(event.target.value)}
      autoFocus={true}
    />
  );
};

const NewTodoInput = () => {
  const { submit } = useContext(context);

  return <BaseNewTodoInput submit={submit} />;
};

type Props = {
  submit: (e: any) => void;
};

BaseNewTodoInput.defaultProps = {
  submit: (f: any) => f,
};

export default NewTodoInput;
