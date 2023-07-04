import React, { FC, useState } from 'react';
import { Todo } from '../../types';

interface Props {
  createTodo: (title: string) => Promise<Todo>
}

export const TodoForm: FC<Props> = ({ createTodo }) => {
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTitleError, setIsTitleError] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const submitHandler = async () => {
    if (!title) {
      setIsTitleError(!title);

      return;
    }

    setIsLoading(true);

    await createTodo(title);

    setIsLoading(false);
    setTitle('');
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        submitHandler();
      }}
    >
      <div className="field">
        <input
          type="text"
          data-cy="titleInput"
          value={title}
          onChange={changeTitleHandler}
        />
        {isTitleError && (
          <span className="error">Please enter a title</span>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
      >
        Add todo
      </button>
    </form>
  );
};
