import { Todo, User } from '../types';

const load = <R>(endpoint: string): Promise<R> => {
  return fetch(`https://mate.academy/students-api/${endpoint}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      console.log('error');

      throw new Error(response.statusText);
    });
};

export const loadUserById = async (
  userId: number,
): Promise<User | null> => {
  try {
    const user = await load<User | null>(`/usersq/${userId}`);

    return user;
  } catch {
    return null;
  }
};

export const loadFullTodoById = async (id: number) => {
  const todo = await load<Todo>(`/todos/${id}`);
  const user = await load<User>(`/users/${todo.userId}`);

  return {
    ...todo,
    user,
  };
};
