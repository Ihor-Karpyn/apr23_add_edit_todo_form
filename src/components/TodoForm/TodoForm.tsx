import React, { FC, useState } from 'react';

export const TodoForm: FC = () => {
  const [title, setTitle] = useState('');

  const [isTitleError, setIsTitleError] = useState(false);

  const changeTitleHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setIsTitleError(false);
  };

  const submitHandler = () => {
    if (!title) {
      setIsTitleError(!title);

      return;
    }

    // update

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

      <button type="submit">
        Add todo
      </button>
    </form>
  );
};
