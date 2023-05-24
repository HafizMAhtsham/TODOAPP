import React from 'react';
import { RiCloseCircleLine } from 'react-icons/ri';
import { TiEdit } from 'react-icons/ti';

const Todo = ({ todos, completeTodo, removeTodo, updateTodo }) => {
  return (
    <div>
      {todos.map((todo, index) => (
        <div
          className={todo.isComplete ? 'todo-row complete' : 'todo-row'}
          key={index}
        >
          <div className='todo-text' onClick={() => completeTodo(todo.id)}>
            {todo.text}
          </div>
          <button
            className='complete-button'
            onClick={() => completeTodo(todo.id)}
          >
            {todo.isComplete ? 'Incomplete' : 'Complete'}
          </button>
          <div className='icons'>
            <RiCloseCircleLine
              onClick={() => removeTodo(todo.id)}
              className='delete-icon'
            />
            <TiEdit
              onClick={() => updateTodo(todo.id, { ...todo, editing: true })}
              className='edit-icon'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
