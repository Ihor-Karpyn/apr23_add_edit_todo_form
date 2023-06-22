import { FullTodo, Todo, User } from './types';
import { usersFromServer } from './api/users';
import { todosFromServer } from './api/todos';

export const findUserById = (args: { users: User[], userId: number }) => {
  const { users, userId } = args;

  return users.find(user => user.id === userId);
};

export const prepareTodos = (
  args: { todos: Todo[], users: User[] },
): FullTodo[] => {
  const { users, todos } = args;

  return todos.map(todo => ({
    ...todo,
    user: findUserById({ users, userId: todo.userId }),
  }));
};

export const getPreparedTodos = () => prepareTodos({
  users: usersFromServer,
  todos: todosFromServer,
});

export const getNewId = (arr: { id: number }[]) => {
  const ids = arr.map(({ id }) => id);
  const maxId = Math.max(...ids);

  return Number.isFinite(maxId)
    ? maxId + 1
    : 1;
};
