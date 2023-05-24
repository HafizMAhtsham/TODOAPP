import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Task = ({ task, onDelete, onToggle }) => {
  const { id, title, completed } = task;

  const handleDelete = () => {
    onDelete(id);
  };

  const handleToggle = () => {
    onToggle(id);
  };

  return (
    <li>
      <span
        style={{
          textDecoration: completed ? 'line-through' : 'none',
        }}
        onClick={handleToggle}
      >
        {title}
      </span>
      <button onClick={handleDelete}>Delete</button>
    </li>
  );
};

const Api = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      const data = response.data;
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      title: newTask,
      completed: false,
    };

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/todos', newTaskObj);
      const data = response.data;
      setTasks([...tasks, data]);
      setNewTask('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const toggleTask = async (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );

    try {
      await axios.put(`https://jsonplaceholder.typicode.com/todos/${taskId}`, updatedTasks);
      setTasks(updatedTasks);
    } catch (error) {
      console.error('Error toggling task:', error);
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') {
      return true;
    } else if (filter === 'completed') {
      return task.completed;
    } else {
      return !task.completed;
    }
  });

  return (
    <div>
      <h1>Todo Api</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <button onClick={addTask}>Add Task</button>
      <div>
        <label>
          Filter:
          <select value={filter} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </label>
      </div>
      <ul>
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleTask}
          />
        ))}
      </ul>
    </div>
  );
};

export default Api;
