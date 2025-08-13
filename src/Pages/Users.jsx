import React, { useState } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import AddEditUserModal from './AddEditUserModal';
import UsersActivityLog from './UsersActivityLog';

const Users = () => {
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [viewLogUser, setViewLogUser] = useState(null);

  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });

  const handleAddUser = () => {
    setEditingUser(null);
    setIsUserModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const users = [
    {
      name: 'Sarah Ahmed',
      email: 'sarah@support.com',
      role: 'Admin',
      roleColor: 'bg-purple-100 text-purple-800',
      status: 'Active',
      statusColor: 'bg-green-100 text-green-800',
      lastLogin: '19 Jul, 2:22 PM'
    },
    {
      name: 'Sarah Ahmed',
      email: 'sarah@support.com',
      role: 'Support',
      roleColor: 'bg-blue-100 text-blue-800',
      status: 'Disabled',
      statusColor: 'bg-gray-100 text-gray-800',
      lastLogin: '19 Jul, 2:22 PM'
    }
  ];

  const FilterDropdown = ({ label, value, onChange, options = [] }) => (
    <div className="relative">
      <select 
        value={value}
        onChange={onChange}
        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        <option value="">{label}</option>
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDownIcon className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );

  const getRoleBadge = (role, colorClass) => (
    <div className="flex items-center space-x-2">
      <div className={`w-2 h-2 rounded-full ${
        role === 'Admin' ? 'bg-purple-500' : 'bg-blue-500'
      }`}></div>
      <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
        {role}
      </span>
    </div>
  );

  const getStatusBadge = (status, colorClass) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
      {status}
    </span>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {viewLogUser ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Activity Log: {viewLogUser.name}
            </h2>
            <button 
              onClick={() => setViewLogUser(null)} 
              className="text-sm text-blue-600 hover:underline"
            >
              ← Back to Users
            </button>
          </div>
          <UsersActivityLog user={viewLogUser} />
        </>
      ) : (
        <>
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6">Support Users</h1>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="relative flex-1 min-w-64">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name or email"
                    value={filters.search}
                    onChange={(e) => setFilters({...filters, search: e.target.value})}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>

                <FilterDropdown 
                  label="Role" 
                  value={filters.role}
                  onChange={(e) => setFilters({...filters, role: e.target.value})}
                  options={['Admin', 'Support']}
                />

                <FilterDropdown 
                  label="Status" 
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  options={['Active', 'Disabled']}
                />

                <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                  Apply Filter
                </button>

                <button 
                  onClick={() => setFilters({ search: '', role: '', status: '' })}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Reset Filter
                </button>
              </div>

              <button 
                onClick={handleAddUser}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
              >
                <PlusIcon className="w-4 h-4" />
                <span>Add New User</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Name</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Email</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Last Login</th>
                    <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
                      <td className="py-4 px-6 text-gray-600">{user.email}</td>
                      <td className="py-4 px-6">{getRoleBadge(user.role, user.roleColor)}</td>
                      <td className="py-4 px-6">{getStatusBadge(user.status, user.statusColor)}</td>
                      <td className="py-4 px-6 text-gray-600">{user.lastLogin}</td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setViewLogUser(user)}
                            className="text-green-600 hover:text-green-800 font-medium flex items-center space-x-1 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4" />
                            <span>View Log</span>
                          </button>

                          <button 
                            onClick={() => handleEditUser(user)}
                            className="text-blue-500 hover:text-blue-700 font-medium flex items-center space-x-1 transition-colors"
                          >
                            <PencilIcon className="w-4 h-4" />
                            <span>Edit</span>
                          </button>

                          <button className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors">
                            <TrashIcon className="w-4 h-4" />
                            <span>Remove</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="bg-white px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-2">
                {[1, 2, 3, '...', 4, 5, 6].map((val, idx) => (
                  <button
                    key={idx}
                    className={`px-3 py-1 text-sm ${
                      val === '...'
                        ? 'text-gray-400'
                        : 'text-gray-500 hover:text-gray-700 transition-colors'
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modals */}
          <AddEditUserModal 
            isOpen={isUserModalOpen} 
            onClose={() => setIsUserModalOpen(false)}
            user={editingUser}
            isEdit={!!editingUser}
          />
        </>
      )}
    </div>
  );
};

export default Users;
