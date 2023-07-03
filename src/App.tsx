import './App.scss';
import {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { TodoList } from './components/TodoList';
import { Todo, UpdateTodoArgs, UpdateTodoArgsQ } from './types';
import { TodoForm } from './components/TodoForm/TodoForm';
import { todosApi } from './api/todos.api';
import { showErrorMessage } from './helpers';

const USER_ID = 4;

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todosApi.loadTodosByUserId(USER_ID)
      .then(setTodos)
      .catch(showErrorMessage);
  }, []);

  const addTodo = useCallback(async (title: string) => {
    try {
      const newTodo = await todosApi.createTodo({
        userId: USER_ID,
        completed: false,
        title,
      });

      setTodos((prevTodos) => [...prevTodos, newTodo]);

      return newTodo;
    } catch (error) {
      showErrorMessage(error as Error);

      return null;
    }
  }, []);

  const updateTodo = async (todoId: number, args: UpdateTodoArgs) => {
    try {
      const updatedTodo = await todosApi.updateTodo(todoId, args);

      setTodos((prevTodos) => prevTodos.map(todo => {
        if (todo.id === todoId) {
          return updatedTodo;
        }

        return todo;
      }));

      return updatedTodo;
    } catch (error) {
      showErrorMessage(error as Error);

      return null;
    }
  };

  const visibleTodos = useMemo(() => {
    return todos.sort((a, b) => b.id - a.id);
  }, [todos]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} submitButtonText="Add" />

      <TodoList todos={visibleTodos} updateTodo={updateTodo} />
    </div>
  );
};
