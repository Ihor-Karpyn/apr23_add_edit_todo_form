import './App.scss';
import React, { useState } from 'react';
import { findUserById, getNewId, getPreparedTodos } from './helpers';
import { TodoList } from './components/TodoList';
import { usersFromServer } from './api/users';
import { FullTodo, UpdateTodoArgs } from './types';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState(getPreparedTodos);

  const addTodo = (title: string, userId: number) => {
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
  };

  const updatedTodo = (args: UpdateTodoArgs) => {
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
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} submitButtonText="Add" />

      <TodoList todos={todos} updateTodo={updatedTodo} />
    </div>
  );
};
