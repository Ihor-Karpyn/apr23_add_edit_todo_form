import { CreateTodoArgs, Todo, UpdateTodoArgs } from '../types';
import { fetchClient } from './fetchClient';

const loadTodos = (): Promise<Todo[]> => {
  return fetchClient.get<Todo[]>('/todos');
};

const loadTodosByUserId = (userId: number): Promise<Todo[]> => {
  return fetchClient.get(`/todos?user_id=${userId}`);
};

const createTodo = (args: CreateTodoArgs) => {
  return fetchClient.post<Todo, CreateTodoArgs>('/todos', args);
};

const updateTodo = (todoId: number, args: UpdateTodoArgs) => {
  return fetchClient.patch<Todo, UpdateTodoArgs>(`/todos/${todoId}`, args);
};

export const todosApi = {
  loadTodos,
  loadTodosByUserId,
  createTodo,
  updateTodo,
};
