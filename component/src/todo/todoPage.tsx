import React from "react";
import { Provider } from "../state/todo/provider";
import NewTodoInput from "./newTodoInput";
import TodoList from "./todoList";

const TodoPage = () => {
  return (
    <Provider>
      <header className="header">
        <h1>todos</h1>
        <NewTodoInput />
      </header>
      <section className="main">
        <ul className="todo-list">
          <TodoList />
        </ul>
      </section>
    </Provider>
  );
};

export default TodoPage;
