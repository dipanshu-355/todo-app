import React from 'react';
import { FaTrash, FaEdit, FaCheck } from 'react-icons/fa';


const TaskList = ({ tasks, toggleComplete, editTask, deleteTask }) => {
  if (!Array.isArray(tasks)) {
    return <p style={{ textAlign: 'center' }}>No tasks available.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task._id}
          className={`task ${task.completed ? 'completed' : ''}`}
        >
          <div className="task-content">
            <h3>{task.title}</h3>
            {task.description && <p>{task.description}</p>}
          </div>
          <div className="actions">
            <FaCheck
              className="icon"
              title="Mark as complete"
              onClick={() => toggleComplete(task._id)}
            />
            <FaEdit
              className="icon"
              title="Edit Task"
              onClick={() => editTask(task)}
            />
            <FaTrash
              className="icon"
              title="Delete Task"
              onClick={() => deleteTask(task._id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
