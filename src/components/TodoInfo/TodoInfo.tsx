import { FC, useState } from 'react';
import cn from 'classnames';
import { Todo } from '../../types';

interface Props {
  todo: Todo;
  deleteTodo: (todoId: number) => Promise<boolean>;
}

export const TodoInfo: FC<Props> = ({ todo, deleteTodo }) => {
  const [isLoading, setIsLoading] = useState(false);

  const deleteHandler = async (todoId: number) => {
    setIsLoading(true);

    await deleteTodo(todoId);

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
    </article>
  );
};
