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

const dummyServiceRequests = [
  {
    id: 1,
    title: "Fix broken faucet",
    requestedBy: "John Doe",
    urgency: "High",
    type: "Maintenance Request",
    description: "The faucet in the kitchen is leaking.",
    timestamp: Date.now() - 3600 * 1000 * 24 * 2, // Two days ago
    status: "In Progress",
  },
  {
    id: 2,
    title: "Replace light bulb",
    requestedBy: "Jane Smith",
    urgency: "Medium",
    type: "Maintenance Request",
    description: "The light bulb in the hallway needs to be replaced.",
    timestamp: Date.now() - 3600 * 1000 * 24 * 1, // One day ago
    status: "Completed",
  },
  // Add more dummy service requests as needed
];

const ServiceRequestList = ({ onSelect, onUpdateStatus }) => {
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (e, requestId) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    onUpdateStatus(requestId, newStatus);
  };

  const handleUpdateStatus = (requestId) => {
    setSelectedRequestId(requestId);
    setSelectedStatus('');
  };

  return (
    <div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Request Id</th>
            <th>Title</th>
            <th>Requested By</th>
            <th>Urgency</th>
            <th>Request Type</th>
            <th>Description</th>
            <th>Date & Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyServiceRequests.map((request) => (
            <tr key={request.id} onClick={() => onSelect(request)}>
              <td>{request.id}</td>
              <td>{request.title}</td>
              <td>{request.requestedBy}</td>
              <td>{request.urgency}</td>
              <td>{REQUEST_TYPES[REQUEST_TYPES.indexOf(request.type)]}</td>
              <td>{request.description}</td>
              <td>{new Date(request.timestamp).toLocaleString()}</td>
              <td>
                {selectedRequestId === request.id ? (
                  <div>
                    <select value={selectedStatus} onChange={(e) => handleStatusChange(e, request.id)}>
                      <option value="">Select Status</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    {request.status}
                    <button onClick={() => handleUpdateStatus(request.id)}>Update Status</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceRequestList;
