import './App.scss';
import { useState } from 'react';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';

export const App = () => {
  const [todos, setTodos] = useState([]);

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm />

      <TodoList todos={todos} />
    </div>
  );
};
