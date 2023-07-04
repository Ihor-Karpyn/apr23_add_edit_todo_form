import { FC } from 'react';
import { Todo } from '../../types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  deleteTodo: (todoId: number) => Promise<boolean>;
}

export const TodoList: FC<Props> = ({ todos, deleteTodo }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          deleteTodo={deleteTodo}
          key={todo.id}
        />
      ))}
    </section>
  );
};
