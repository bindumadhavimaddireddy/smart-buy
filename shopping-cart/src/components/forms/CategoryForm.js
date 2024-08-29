import React from 'react';

const CategoryForm = ({handleSubmit, name, setName, onCancel}) => {
    return (
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label for="categoryName">Name</label>
          <input
            type="text"
            className="form-control mb-3"
            value={name}
            id="categoryName"
            onChange={(e) => setName(e.target.value)}
            autoFocus
            required
          />
          <button type="submit" className="btn btn-outline-primary">
            Save
          </button>
          {onCancel && <button className="btn btn-outline-danger ml-3" onClick={onCancel}>Cancel</button>}
        </div>
      </form>
    );
  };

export default CategoryForm