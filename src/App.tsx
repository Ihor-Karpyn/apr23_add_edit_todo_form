import './App.scss';
import { useCallback, useEffect, useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { Todo, UpdateTodoArgs } from './types';
import { todoApi } from './api/todo.api';

export const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    todoApi.loadByUserId(4)
      .then(todosFromServer => setTodos(todosFromServer));
  }, []);

  const createTodo = useCallback((title: string): Promise<Todo> => {
    const createArgs = {
      title,
      completed: false,
      userId: 4,
    };

    return todoApi.create(createArgs)
      .then(createdTodo => {
        setTodos((prevTodos) => [...prevTodos, createdTodo]);

        return createdTodo;
      });
  }, []);

  const deleteTodo = useCallback(async (todoId: number): Promise<boolean> => {
    const response = await todoApi.remove(todoId);

    const isDeleted = Boolean(response);

    if (isDeleted) {
      setTodos((prev) => prev.filter(todo => todo.id !== todoId));
    }

    return isDeleted;
  }, []);

  const updateTodo = useCallback(async (
    todoId: number,
    args: UpdateTodoArgs,
  ): Promise<Todo> => {
    const updatedTodo: Todo = await todoApi.update(todoId, args);

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
