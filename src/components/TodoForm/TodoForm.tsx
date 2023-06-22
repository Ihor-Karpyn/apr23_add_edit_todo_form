import React, { FC, useState } from 'react';
import { usersFromServer } from '../../api/users';

interface Props {
  onSubmit: (title: string, userId: number) => void;
  initialTitle?: string;
  initialUserId?: number;
  submitButtonText: string;
}

export const TodoForm: FC<Props> = (props) => {
  const {
    onSubmit,
    initialTitle = '',
    initialUserId = 0,
    submitButtonText,
  } = props;

  const [title, setTitle] = useState(initialTitle);
  const [userId, setUserId] = useState<number>(initialUserId);

  const [isTitleError, setIsTitleError] = useState(false);
  const [isUserError, setIsUserError] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const changeUserIdHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setIsUserError(false);
  };

  const clearForm = () => {
    setTitle('');
    setUserId(0);
  };

  const submitHandler = () => {
    if (!title || !userId) {
      setIsTitleError(!title);
      setIsUserError(!userId);

      return;
    }

    onSubmit(title, userId);

    clearForm();
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

      <div className="field">
        <select
          data-cy="userSelect"
          value={userId}
          onChange={changeUserIdHandler}
        >
          <option value={0} disabled>Choose a user</option>

          {usersFromServer.map(user => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        {isUserError && (
          <span className="error">Please choose a user</span>
        )}
      </div>

      <button type="submit" data-cy="submitButton">
        {submitButtonText}
      </button>
    </form>
  );
};
