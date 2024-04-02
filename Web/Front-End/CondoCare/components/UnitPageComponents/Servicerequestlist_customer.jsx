import React from 'react';

const ServiceListCustomer = ({ services }) => {
  // Dummy data for testing
  const dummyData = [
    {
      id: 1,
      requestTitle: 'Leak in Apartment',
      requestType: 'Maintenance',
      timeRequested: '2024-03-20 10:00 AM',
      requestStatus: 'Pending',
    },
    {
      id: 2,
      requestTitle: 'Parking Permit Renewal',
      requestType: 'Administration',
      timeRequested: '2024-03-18 02:30 PM',
      requestStatus: 'Completed',
    },
    {
      id: 3,
      requestTitle: 'Guest Access',
      requestType: 'Security',
      timeRequested: '2024-03-15 09:45 AM',
      requestStatus: 'In Progress',
    },
  ];

  // If no services are provided, use the dummy data for testing
  services = services || dummyData;

  return (
    <div className="service-list-customer">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Request Title</th>
            <th>Request Type</th>
            <th>Time Requested</th>
            <th>Request Status</th>
          </tr>
        </thead>
        <tbody>
          {services.map((service, index) => (
            <tr key={index}>
              <td>{service.requestTitle}</td>
              <td>{service.requestType}</td>
              <td>{service.timeRequested}</td>
              <td>{service.requestStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceListCustomer;
