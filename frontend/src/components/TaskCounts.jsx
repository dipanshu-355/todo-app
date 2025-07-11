import React from 'react';

const TaskCounts = ({ tasks }) => {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;

  return (
    <div className="task-counts">
      <p>Total: {total} | Completed: {completed} | Pending: {pending}</p>
    </div>
  );
};

export default TaskCounts;
