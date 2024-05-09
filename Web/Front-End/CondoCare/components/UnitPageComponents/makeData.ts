export type Request = {
  id: string;
  unit_id: string;
  employee_id: string;
  type: string;
  description: string;
  status: string;
};

 export const RequestTypes = [
  'daily_operations',
  'move_in',
  'intercom_change',
  'access',
  'common_area_report',
  'question',
];

export const RequestStatuses = [
  "Received",
  "In progress",
  "Completed"
];

export const fakeData: Request[] = [
    {
      id: '9s41rp',
      unit_id: 'A101',
      employee_id: 'E456',
      type: 'move_in',
      description: 'Tenant move-in request',
      status: 'Received',
    },
    {
      id: '08m6rx',
      unit_id: 'B202',
      employee_id: 'E789',
      type: 'daily_operations',
      description: 'Maintenance check',
      status: 'In Progress',
    },
    {
      id: '5ymtrc',
      unit_id: 'C303',
      employee_id: 'E123',
      type: 'access',
      description: 'Access card replacement',
      status: 'Completed',
    },
    {
      id: 'ek5b97',
      unit_id: 'D404',
      employee_id: 'E987',
      type: 'common_area_report',
      description: 'Broken light fixture in lobby',
      status: 'Received',
    },
    {
      id: 'xxtydd',
      unit_id: 'E505',
      employee_id: 'E654',
      type: 'question',
      description: 'Tenant inquiry about recycling bins',
      status: 'In Progress',
    },
    {
      id: 'wzxj9m',
      unit_id: 'F606',
      employee_id: 'E234',
      type: 'intercom_change',
      description: 'Update intercom list for Unit F606',
      status: 'Completed',
    },
    {
      id: '21dwtz',
      unit_id: 'G707',
      employee_id: 'E345',
      type: 'move_in',
      description: 'New tenant move-in request',
      status: 'Received',
    },
    {
      id: 'o8oe4k',
      unit_id: 'H808',
      employee_id: 'E567',
      type: 'daily_operations',
      description: 'HVAC system inspection',
      status: 'In Progress',
    },
  ];
