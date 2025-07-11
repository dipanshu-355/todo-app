import React from 'react';

const FilterButtons = ({ filter, setFilter }) => {
  const filters = ["All", "Completed", "Pending"];

  return (
    <div className="filter-buttons">
      {filters.map((f) => (
        <button
          key={f}
          className={filter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
