import { CreateTodoArgs, Todo, UpdateTodoArgs } from '../types';
import { fetchClient } from './fetchClient';

const ENDPOINTS = {
  todos: '/todos',
};

const loadByUserId = (userId: number): Promise<Todo[]> => (
  fetchClient.get<Todo[]>(`${ENDPOINTS.todos}?user_id=${userId}`)
);

const create = (args: CreateTodoArgs): Promise<Todo> => (
  fetchClient.post<Todo, CreateTodoArgs>(ENDPOINTS.todos, args)
);

const remove = (todoId: number): Promise<number> => (
  fetchClient.delete<number>(`${ENDPOINTS.todos}/${todoId}`)
);

const update = (todoId: number, updateArgs: UpdateTodoArgs): Promise<Todo> => (
  fetchClient.patch<Todo, UpdateTodoArgs>(`${ENDPOINTS.todos}/${todoId}`, updateArgs)
);

export const todoApi = {
  loadByUserId,
  create,
  remove,
  update,
};
