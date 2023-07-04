import { FC } from 'react';
import { Todo, UpdateTodoArgs } from '../../types';
import { TodoInfo } from '../TodoInfo/TodoInfo';

interface Props {
  todos: Todo[];
  deleteTodo: (todoId: number) => Promise<boolean>;
  updateTodo: (todoId: number, args: UpdateTodoArgs) => Promise<Todo>;
}

export const TodoList: FC<Props> = ({ todos, deleteTodo, updateTodo }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <TodoInfo
          todo={todo}
          deleteTodo={deleteTodo}
          key={todo.id}
          updateTodo={updateTodo}
        />
      ))}
    </section>
  );
};
