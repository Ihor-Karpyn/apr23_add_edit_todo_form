import { FC } from 'react';
import cn from 'classnames';
import { Todo } from '../../types';

interface Props {
  todos: Todo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <section className="TodoList">
      {todos.map(todo => (
        <article
          data-id="15"
          className={cn('TodoInfo', {
            'TodoInfo--completed': todo.completed,
          })}
        >
          <h2 className="TodoInfo__title">
            {todo.title}
          </h2>
        </article>
      ))}
    </section>
  );
};
