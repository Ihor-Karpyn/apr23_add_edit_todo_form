import { FC } from 'react';
import cn from 'classnames';
import { FullTodo } from '../../types';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: FullTodo;
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
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}

      <button
        type="button"
        onClick={() => onEdit(todo.id)}
      >
        Edit
      </button>
    </article>
  );
};
