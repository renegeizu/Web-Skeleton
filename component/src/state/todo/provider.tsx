import React, { createContext, useEffect, useReducer } from "react";
import { Todo } from "../../models/todo";
import createActions, { ActionType } from "./actions";
import reducer from "./reducer";

const initialState = {
  list: [],
  current: "",
  loaded: false,
  loadTodos: () => null,
  submit: () => null,
};

const context = createContext<TodoContextType>(initialState);

export interface ProviderProps {
  children: React.ReactNode;
}
const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = createActions(state, dispatch);

  useEffect(() => {
    if (actions?.loadTodos) {
      actions.loadTodos();
    }
  }, []);

  return <context.Provider value={{ ...state, ...actions }}>{children}</context.Provider>;
};

export type TodoStateType = {
  list: Todo[] | { content: string; id: string | undefined }[];
  current: string;
  loaded: boolean;
};

export type TodoContextType = ActionType & TodoStateType;

export { Provider, context };
