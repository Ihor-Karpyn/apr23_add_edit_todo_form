import { FC, useState } from 'react';
import { TodoInfo } from '../TodoInfo';
import { FullTodo, UpdateTodoArgs } from '../../types';
import { TodoForm } from '../TodoForm/TodoForm';

interface Props {
  todos: FullTodo[];
  updateTodo: (args: UpdateTodoArgs) => void;
}

export const TodoList: FC<Props> = ({ todos, updateTodo }) => {
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  const onEdit = (todoId: number) => setEditedTodoId(todoId);

  const onEditSubmit = (title: string, userId: number, todoId: number) => {
    updateTodo({
      todoId,
      userId,
      title,
    });

    setEditedTodoId(null);
  };

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <>
          {todo.id === editedTodoId
            ? (
              <TodoForm
                onSubmit={(title, userId) => (
                  onEditSubmit(title, userId, todo.id)
                )}
                initialTitle={todo.title}
                initialUserId={todo.userId}
                submitButtonText="Save"
              />
            )
            : (
              <TodoInfo
                todo={todo}
                key={todo.id}
                onEdit={onEdit}
              />
            )}
        </>
      ))}
    </section>
  );
};
