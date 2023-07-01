import * as api from "../../service/api";
import { TodoStateType } from "./provider";
import { AxiosRequestConfig } from "axios";
import { ApiTodo } from "../../models/todo";

const createActions = (_state: TodoStateType, dispatch: React.Dispatch<Actions>): ActionType => {
  return {
    loadTodos: () => {
      api.todos().then((response) => dispatch({ type: Types.Load, ...response }));
    },
    submit: (current: string) => {
      api.add(current).then((response) => dispatch({ type: Types.Add, ...response }));
    },
  };
};

interface IActions {
  LOAD_TODOS: string;
  ADD_TODO: string;
}

export enum Types {
  Load = "LOAD_TODOS",
  Add = "ADD_TODO",
}

interface LoadTodosAction {
  type: IActions[Types.Load];
  data: ApiTodo;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

interface SubmitAction {
  type: IActions[Types.Add];
  data: ApiTodo;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request?: any;
}

export type Actions = LoadTodosAction | SubmitAction;

export type ActionType = {
  loadTodos: () => void;
  submit: (current: string) => void;
};

export default createActions;
