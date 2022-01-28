import React, { useState, useRef, useEffect } from 'react';
import { Todo } from './model';

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <>
      todos state: <pre>{JSON.stringify(todos, null, 2)}</pre>
      <form
        className="todoItem"
        onSubmit={(e) => {
          handleEdit(e, todo.id);
        }}
      >
        {edit ? (
          <input
            type="text"
            value={editTodo}
            className="todoItem__text"
            onChange={(e) => {
              setEditTodo(e.target.value);
            }}
            ref={inputRef}
          />
        ) : todo.isDone ? (
          <s className="todoItem__text">{todo.todo}</s>
        ) : (
          <span className="todoItem__text">{todo.todo}</span>
        )}

        <div className="block__span">
          <span
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            Edit
          </span>

          <button
            className="icon"
            type="button"
            onClick={() => handleDelete(todo.id)}
            style={{ cursor: 'pointer' }}
          >
            Delete
          </button>

          <button
            className="icon"
            type="button"
            onClick={() => handleDone(todo.id)}
            style={{ cursor: 'pointer' }}
          >
            Done
          </button>
        </div>
      </form>
    </>
  );
};

export default TodoItem;
