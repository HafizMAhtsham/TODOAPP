import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import Todo from './Todo';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    const parsedTodos = storedTodos ? JSON.parse(storedTodos) : [];
    setTodos(parsedTodos);
  }, []);

  const addTodo = todo => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }

    setTodos(prev => {
      const updatedTodos = prev.map(item => (item.id === todoId ? newValue : item));
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      return updatedTodos;
    });
  };

  const removeTodo = id => {
    const removedArr = todos.filter(todo => todo.id !== id);
    setTodos(removedArr);
    localStorage.setItem('todos', JSON.stringify(removedArr));
  };

  const completeTodo = id => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, isComplete: !todo.isComplete };
      }
      return todo;
    });
    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const filterTodos = () => {
    if (filter === 'completed') {
      return todos.filter(todo => todo.isComplete);
    } else if (filter === 'uncompleted') {
      return todos.filter(todo => !todo.isComplete);
    } else {
      return todos;
    }
  };

  return (
    <>
      <h1>What's the Plan for Today?</h1>
      <TodoForm onSubmit={addTodo} />
      <div className="filter-buttons">
        <button className='btn_1' onClick={() => setFilter('all')}>All</button>
        <button className='btn_1' onClick={() => setFilter('completed')}>Completed</button>
        <button className='btn_1' onClick={() => setFilter('uncompleted')}>Uncompleted</button>
      </div>
      <Todo
        todos={filterTodos()}
        completeTodo={completeTodo}
        removeTodo={removeTodo}
        updateTodo={updateTodo}
      />
    </>
  );
}

export default TodoList;
