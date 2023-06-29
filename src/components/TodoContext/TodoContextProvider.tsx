import {
  FC, memo, ReactNode, useCallback, useMemo, useState,
} from 'react';
import { TodoContext, TodoContextProps } from './TodoContext';
import { findUserById, getNewId, getPreparedTodos } from '../../helpers';
import { FullTodo, UpdateTodoArgs } from '../../types';
import { usersFromServer } from '../../api/users';

interface Props {
  children: ReactNode,
}

export const TodoContextProvider: FC<Props> = memo(({ children }) => {
  const [todos, setTodos] = useState(getPreparedTodos);

  const addTodo = useCallback((title: string, userId: number) => {
    setTodos((prevTodos) => {
      const newTodo: FullTodo = {
        id: getNewId(prevTodos),
        completed: false,
        user: findUserById({ users: usersFromServer, userId }),
        title,
        userId,
      };

      return [...prevTodos, newTodo];
    });
  }, []);

  const updateTodo = useCallback((args: UpdateTodoArgs) => {
    setTodos((prevTodos) => prevTodos.map(todo => {
      if (todo.id === args.todoId) {
        return {
          ...todo,
          title: args.title,
          userId: args.userId,
          user: findUserById({ users: usersFromServer, userId: args.userId }),
        };
      }

      return todo;
    }));
  }, []);

  const value: TodoContextProps = useMemo(() => ({
    todos,
    addTodo,
    updateTodo,
  }), [addTodo, todos, updateTodo]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
});
