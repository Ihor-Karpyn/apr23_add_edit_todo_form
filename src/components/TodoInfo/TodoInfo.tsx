import { FC, useState } from 'react';
import cn from 'classnames';
import { Todo, UpdateTodoArgs } from '../../types';

interface Props {
  todo: Todo;
  deleteTodo: (todoId: number) => Promise<boolean>;
  updateTodo: (todoId: number, args: UpdateTodoArgs) => Promise<Todo>;
}

export const TodoInfo: FC<Props> = ({ todo, deleteTodo, updateTodo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (todoId: number) => {
    setIsLoading(true);

    await deleteTodo(todoId);

    setIsLoading(false);
  };

  const updateTodoHandler = async () => {
    setIsLoading(true);

    await updateTodo(
      todo.id,
      { completed: !todo.completed },
    );

    setIsLoading(false);
  };

  return (
    <article
      data-id="15"
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <button
        type="button"
        disabled={isLoading}
        onClick={() => deleteHandler(todo.id)}
      >
        delete
      </button>

      <button
        type="button"
        onClick={updateTodoHandler}
        disabled={isLoading}
      >
        {todo.completed ? 'Uncomplete' : 'Complete'}
      </button>
    </article>
  );
};
