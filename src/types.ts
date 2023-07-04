export interface Todo {
  id: number;
  title: string ;
  completed: boolean;
  userId: number;
}

export type UpdateTodoArgs = Partial<Pick<Todo, 'title' | 'completed'>>;
