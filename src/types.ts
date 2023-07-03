export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type CreateTodoArgs = Omit<Todo, 'id'>;
export type UpdateTodoArgs = Partial<Omit<Todo, 'id' | 'userId'>>;

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface UpdateTodoArgsQ {
  title: string,
  userId: number,
  todoId: number
}
