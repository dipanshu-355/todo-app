import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchTasks = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/api/tasks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        setTasks(data);
      } else {
        console.error('Tasks fetch did not return an array:', data);
        setTasks([]);
      }
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleToggleComplete = async (id) => {
    await fetch(`/api/tasks/${id}/complete`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    fetchTasks();
  };

  const handleEditTask = (task) => {
    alert('Edit feature coming soon!'); // You can implement a modal later
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  const taskCounts = {
    total: tasks.length,
    completed: tasks.filter((task) => task.completed).length,
    pending: tasks.filter((task) => !task.completed).length,
  };

  return (
    <div>
      <TaskForm onTaskAdded={fetchTasks} />

      {/* Task Counts */}
      <div className="task-counts">
        <div className="count total">Total: {taskCounts.total}</div>
        <div className="count completed">Completed: {taskCounts.completed}</div>
        <div className="count pending">Pending: {taskCounts.pending}</div>
      </div>

      {/* Filter Buttons */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('pending')}>Pending</button>
      </div>

      <TaskList
        tasks={filteredTasks}
        toggleComplete={handleToggleComplete}
        editTask={handleEditTask}
        deleteTask={handleDeleteTask}
      />
    </div>
  );
}

export default Home;
