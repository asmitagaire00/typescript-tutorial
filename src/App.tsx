import React, { useState } from 'react';
import InputField from './components/InputField';
import { Todo } from './components/model';
import Todolist from './components/Todolist';

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);
  console.log('todo', todo);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: Date.now(), todo: todo, isDone: false }]);
      console.log('todoList', todos);
      setTodo('');
    }
  };

  return (
    <div className="app">
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <Todolist todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
