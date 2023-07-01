export interface Todo {
  content: string;
  created_at?: string;
  id: string;
}

export interface ApiTodo {
  data: Todo & Todo[];
}
