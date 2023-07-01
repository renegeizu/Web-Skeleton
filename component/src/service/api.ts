import connector from "./connector";
import { AxiosResponse } from "axios";
import { ApiTodo } from "../models/todo";

export function todos(): Promise<AxiosResponse<ApiTodo>> {
  return connector.get("/todos");
}

export function add(current: string): Promise<AxiosResponse<ApiTodo>> {
  return connector.post("/todos", { content: current });
}
