import './App.scss';
import { TodoList } from './components/TodoList';
import { TodoForm } from './components/TodoForm/TodoForm';
import { useTodoContext } from './components/TodoContext/useTodoContext';

export const App = () => {
  const { addTodo } = useTodoContext();

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <TodoForm onSubmit={addTodo} submitButtonText="Add" />

      <TodoList />
    </div>
  );
};
