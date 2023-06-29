import { FC, useEffect, useState } from 'react';
import { Todo } from './types';
import './App.scss';
import { UserInfo } from './components/UserInfo';

export const App: FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);

    fetch('https://mate.academy/students-api/todos')
      .then((response) => response.json())
      .then(setTodos)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <h1>App</h1>

      <UserInfo userId={selectedUserId} />

      {isLoading && <h2>Loading...</h2>}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>
              {todo.title}
            </p>
            <button
              type="button"
              onClick={() => setSelectedUserId(todo.userId)}
              style={{
                backgroundColor: todo.userId === selectedUserId
                  ? 'yellow'
                  : 'silver',
              }}
            >
              {todo.userId}
            </button>
            <hr />
          </li>
        ))}
      </ul>
    </>
  );
};
