import { FC, useState } from 'react';
import { TodoInfo } from '../TodoInfo';
import { Todo, UpdateTodoArgs } from '../../types';
import { TodoForm } from '../TodoForm/TodoForm';

interface Props {
  todos: Todo[];
  updateTodo: (todoId: number, args: UpdateTodoArgs) => Promise<Todo | null>;
}

export const TodoList: FC<Props> = ({ todos, updateTodo }) => {
  const [editedTodoId, setEditedTodoId] = useState<number | null>(null);

  const onEdit = (todoId: number) => setEditedTodoId(todoId);

  const onEditSubmit = async (title: string, todoId: number, completed: boolean) => {
    const updatedTodo = await updateTodo(todoId, {
      title,
      completed,
    });

    setEditedTodoId(null);

    return updatedTodo;
  };

  return (
    <section className="TodoList">
      {todos.map(todo => (
        <>
          {todo.id === editedTodoId
            ? (
              <TodoForm
                onSubmit={(title) => (
                  onEditSubmit(title, todo.id, todo.completed)
                )}
                initialTitle={todo.title}
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
