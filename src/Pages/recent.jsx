import React from 'react';

const RecentActivity = () => {
  const activities = [
    {
      time: '10:05 am',
      eventType: 'Sync',
      tenant: 'Sweet Bakes',
      device: 'Tappy-2381',
      status: 'Success',
      details: 'Product Synced',
    },
    {
      time: '9:58 am',
      eventType: 'Error',
      tenant: 'Salon Xpress',
      device: 'Tappy-5212',
      status: 'Failed',
      details: 'ERP Auth Failed',
    },
    {
      time: '9:45 am',
      eventType: 'Pairing',
      tenant: 'Bread & Butter',
      device: 'Tappy-01',
      status: 'Paired',
      details: 'New Device Registration',
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Success':
        return 'bg-green-100 text-green-800';
      case 'Failed':
        return 'bg-red-100 text-red-800';
      case 'Paired':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tenant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Device
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Details
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {activities.map((activity, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.time}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.eventType}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.tenant}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {activity.device}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                    {activity.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  "{activity.details}"
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentActivity;