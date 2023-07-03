import React, { FC, useState } from 'react';
import { Todo } from '../../types';

interface Props {
  onSubmit: (title: string) => Promise<Todo | null>;
  initialTitle?: string;
  submitButtonText: string;
}

export const TodoForm: FC<Props> = (props) => {
  const {
    onSubmit,
    initialTitle = '',
    submitButtonText,
  } = props;

  const [title, setTitle] = useState(initialTitle);

  const [isTitleError, setIsTitleError] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const clearForm = () => {
    setTitle('');
  };

  const submitHandler = async () => {
    if (!title) {
      setIsTitleError(!title);

      return;
    }

    setIsLoading(true);

    const createdTodo = await onSubmit(title);

    if (createdTodo) {
      setIsLoading(false);

      clearForm();
    }
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
        data-cy="submitButton"
        disabled={isLoading}
      >
        {submitButtonText}
      </button>
    </form>
  );
};
