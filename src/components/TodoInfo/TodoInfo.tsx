import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types';

interface Props {
  todo: Todo;
  onEdit: (todoId: number) => void;
}

export const TodoInfo: FC<Props> = ({ todo, onEdit }) => {
  return (
    <article
      data-id="15"
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">
        {`#${todo.userId} ${todo.title}`}
      </h2>

      <button
        type="button"
        onClick={() => onEdit(todo.id)}
      >
        Edit
      </button>
    </article>
  );
};
