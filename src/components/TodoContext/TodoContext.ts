import { createContext } from 'react';
import { FullTodo, UpdateTodoArgs } from '../../types';

export interface TodoContextProps {
  todos: FullTodo[];
  addTodo: (title: string, userId: number) => void;
  updateTodo: (args: UpdateTodoArgs) => void;
}

export const TodoContext = createContext<TodoContextProps>({
  todos: [],
  addTodo: () => { /* empty */ },
  updateTodo: () => { /* empty */ },
});
