import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo } from './types';

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

  const deleteTodo = useCallback((todoId: number): Promise<boolean> => {
    return fetch(
      `https://mate.academy/students-api/todos/${todoId}`,
      {
        method: 'DELETE',
      },
    )
      .then(response => response.json())
      .then(response => {
        const isDeleted = Boolean(response);

        if (isDeleted) {
          setTodos((prev) => prev.filter(todo => todo.id !== todoId));
        }

        return isDeleted;
      });
  }, []);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm createTodo={createTodo} />

      <TodoList todos={todos} deleteTodo={deleteTodo} />
    </div>
  );
};
