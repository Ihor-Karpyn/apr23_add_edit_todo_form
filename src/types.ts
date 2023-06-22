export interface Todo {
  id: number;
  title: string ;
  completed: boolean;
  userId: number;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export interface FullTodo extends Todo {
  user?: User;
}

export interface UpdateTodoArgs {
  title: string,
  userId: number,
  todoId: number
}
