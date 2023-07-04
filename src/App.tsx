import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo, UpdateTodoArgs } from './types';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetch('https://mate.academy/students-api/todos?user_id=4')
      .then(response => response.json())
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const createTodo = useCallback((title: string): Promise<Todo> => {
    const body = {
      title,
      completed: false,
      userId: 4,
    };

    return fetch(
      'https://mate.academy/students-api/todos',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      },
    )
      .then(response => response.json() as Promise<Todo>)
      .then(createdTodo => {
        setTodos((prevTodos) => [...prevTodos, createdTodo]);

        return createdTodo;
      });
  }, []);

  const deleteTodo = useCallback(async (todoId: number): Promise<boolean> => {
    const response = await fetch(
      `https://mate.academy/students-api/todos/${todoId}`,
      { method: 'DELETE' },
    );

    const responseData = await response.json();

    const isDeleted = Boolean(responseData);

    if (isDeleted) {
      setTodos((prev) => prev.filter(todo => todo.id !== todoId));
    }

    return isDeleted;
  }, []);

  const updateTodo = useCallback(async (
    todoId: number,
    args: UpdateTodoArgs,
  ): Promise<Todo> => {
    const response = await fetch(
      `https://mate.academy/students-api/todos/${todoId}`,
      {
        body: JSON.stringify(args),
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
      },
    );

    const updatedTodo: Todo = await response.json();

    setTodos(prevTodos => prevTodos.map(todo => {
      if (todo.id !== todoId) {
        return todo;
      }

      return updatedTodo;
    }));

    return updatedTodo;
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm createTodo={createTodo} />

      <TodoList
        todos={todos}
        deleteTodo={deleteTodo}
        updateTodo={updateTodo}
      />
    </div>
  );
};
