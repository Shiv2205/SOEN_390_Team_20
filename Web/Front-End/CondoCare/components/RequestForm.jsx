import React, { useState } from 'react';

const REQUEST_TYPES = [
  'Broken Appliance',
  'Maintenance Request',
  'Pest Control',
  'Other',
];

const URGENCY_LEVELS = [
  'Low',
  'Medium',
  'High',
];

const RequestForm = ({ onSubmit, views, setView, }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState(REQUEST_TYPES[0]);
  const [urgency, setUrgency] = useState(URGENCY_LEVELS[0]);
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, type, urgency, description });
    setTitle('');
    setType(REQUEST_TYPES[0]);
    setUrgency(URGENCY_LEVELS[0]);
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <div className="form-group">
        <label htmlFor="title" style={{ color: 'black' }}>Service Request </label>
        <input
          type="text"
          className="form-control"
          id="title"
          name="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="type" style={{ color: 'black' }}>Request Type:</label>
        <select
          className="form-control"
          id="type"
          name="type"
          value={type}
          onChange={e => setType(e.target.value)}
        >
          {REQUEST_TYPES.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="urgency" style={{ color: 'black' }}>Urgency:</label>
        <select
          className="form-control"
          id="urgency"
          name="urgency"
          value={urgency}
          onChange={e => setUrgency(e.target.value)}
        >
          {URGENCY_LEVELS.map(level => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description" style={{ color: 'black' }}>Description:</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="4"
          value={description}
          onChange={e => setDescription(e.target.value)}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Create Request
      </button>
    </form>
  );
};

export default RequestForm;