import React from "react";
import { Provider } from "../../state/todo/provider";
import NewTodoInput from "./NewTodoInput";
import TodoList from "./TodoList";

const TodoPage: React.FC = () => {
  return (
    <Provider>
      <div className={"bg-white w-2/6 shadow m-auto px-4 py-5 my-10"}>
        <header className="header">
          <h1 className={"text-secondary uppercase"}>todos</h1>
          <p className={"text-primary my-5"}>Add things you need to do!</p>
          <NewTodoInput />
        </header>
        <section className="main">
          <ul className="list-inside list-decimal todo-list">
            <TodoList />
          </ul>
        </section>
      </div>
    </Provider>
  );
};

export default TodoPage;
