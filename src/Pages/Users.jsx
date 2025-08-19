import React, { useState, useEffect } from 'react';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  PencilIcon, 
  TrashIcon,
  PlusIcon,
  EyeIcon,
  XMarkIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import axios from '../utils/axios';
import { toast } from 'react-toastify';

const UsersActivityLog = ({ user, onBack }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <h3 className="text-lg font-medium mb-4">Activity Log for {user.name}</h3>
    <div className="space-y-4">
      {[1, 2, 3, 4, 5].map((item) => (
        <div key={item} className="border-b border-gray-200 pb-4 last:border-0">
          <div className="flex justify-between">
            <span className="font-medium">System login</span>
            <span className="text-gray-500 text-sm">2 hours ago</span>
          </div>
          <p className="text-gray-600 text-sm">Logged in from 192.168.1.{item}</p>
        </div>
      ))}
    </div>
  </div>
);

const Users = () => {
  const [viewLogUser, setViewLogUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [displayedUsers, setDisplayedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const [filters, setFilters] = useState({
    search: '',
    role: '',
    status: ''
  });

  // Fetch all users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/auth');
      // Transform API data to match our structure
      const formattedUsers = response.data.map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role:  'Admin' ,
        status:'Active',
        lastLogin: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)).toISOString()
      }));
      setAllUsers(formattedUsers);
      setFilteredUsers(formattedUsers);
    } catch (error) {
      toast.error('Failed to fetch users');
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Apply filters
  useEffect(() => {
    const filtered = allUsers.filter(user => {
      const matchesSearch = filters.search === '' || 
        user.name.toLowerCase().includes(filters.search.toLowerCase()) || 
        user.email.toLowerCase().includes(filters.search.toLowerCase());
      
      const matchesRole = filters.role === '' || user.role === filters.role;
      const matchesStatus = filters.status === '' || user.status === filters.status;
      
      return matchesSearch && matchesRole && matchesStatus;
    });
    
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [filters, allUsers]);

  // Paginate
  useEffect(() => {
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    setDisplayedUsers(filteredUsers.slice(indexOfFirstUser, indexOfLastUser));
  }, [filteredUsers, currentPage]);

  const handleAddUser = () => {
    setIsAddingUser(true);
  };

  const handleCancelAdd = () => {
    setIsAddingUser(false);
    setNewUser({ name: '', email: '', password: '' });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handleCreateUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.password) {
        toast.error('Please fill all fields');
        return;
      }

      // Simulate API call
      

      
       const response = await axios.post('/api/auth/signup', newUserData);
      
      setAllUsers([...allUsers, newUserData]);
      toast.success('User created successfully');
      setIsAddingUser(false);
      setNewUser({ name: '', email: '', password: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create user');
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
     
       await axios.delete(`/api/auth/${userId}`);
      
      setAllUsers(allUsers.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      toast.error('Failed to delete user');
      console.error('Error deleting user:', error);
    }
  };

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

  // const getRoleBadge = (role) => (
  //   <div className="flex items-center space-x-2">
  //     <div className={`w-2 h-2 rounded-full ${
  //       role === 'Admin' ? 'bg-purple-500' : 'bg-blue-500'
  //     }`}></div>
  //     <span className={`px-3 py-1 rounded-full text-sm font-medium ${
  //       role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'
  //     }`}>
  //       {role}
  //     </span>
  //   </div>
  // );

  const getStatusBadge = (status) => (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
      status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
    }`}>
      {status}
    </span>
  );

  const handlePageChange = (page) => {
    if (page === 'prev' && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    } else if (page === 'next' && currentPage < Math.ceil(filteredUsers.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (typeof page === 'number') {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => handlePageChange('prev')}
          disabled={currentPage === 1}
          className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <ArrowLeftIcon className="w-4 h-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`w-8 h-8 rounded-md text-sm ${
              page === currentPage
                ? 'bg-green-500 text-white'
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => handlePageChange('next')}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    );
  };

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
              className="text-sm text-blue-600 hover:underline flex items-center"
            >
              <ArrowLeftIcon className="w-4 h-4 mr-1" />
              Back to Users
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

                <button 
                  onClick={() => setFilters({ search: '', role: '', status: '' })}
                  className="text-green-600 hover:text-green-700 text-sm font-medium"
                >
                  Reset Filter
                </button>
              </div>

              {!isAddingUser && (
                <button 
                  onClick={handleAddUser}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                >
                  <PlusIcon className="w-4 h-4" />
                  <span>Add New User</span>
                </button>
              )}
            </div>
          </div>

          {/* Add User Form */}
          {isAddingUser && (
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Add New User</h3>
                <button 
                  onClick={handleCancelAdd} 
                  className="text-gray-500 hover:text-gray-700"
                  aria-label="Cancel"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={newUser.name}
                    onChange={handleNewUserChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleNewUserChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input
                    type="password"
                    name="password"
                    value={newUser.password}
                    onChange={handleNewUserChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    placeholder="Password"
                    required
                    minLength="6"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-3">
                <button
                  onClick={handleCancelAdd}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCreateUser}
                  className="px-4 py-2 bg-green-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Create User
                </button>
              </div>
            </div>
          )}

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="p-6 text-center text-gray-500">Loading users...</div>
            ) : (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Name</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Email</th>
                        {/* <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th> */}
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Last Login</th>
                        <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {displayedUsers.length > 0 ? (
                        displayedUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                            <td className="py-4 px-6 font-medium text-gray-900">{user.name}</td>
                            <td className="py-4 px-6 text-gray-600">{user.email}</td>
                            {/* <td className="py-4 px-6">
                              {getRoleBadge(user.role)}
                            </td> */}
                            <td className="py-4 px-6">
                              {getStatusBadge(user.status)}
                            </td>
                            <td className="py-4 px-6 text-gray-600">
                              {new Date(user.lastLogin).toLocaleDateString('en-US', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex space-x-2">
                                {/* <button
                                  onClick={() => setViewLogUser(user)}
                                  className="text-green-600 hover:text-green-800 font-medium flex items-center space-x-1 transition-colors"
                                >
                                  <EyeIcon className="w-4 h-4" />
                                  <span>View Log</span>
                                </button> */}

                                <button 
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-500 hover:text-red-700 font-medium flex items-center space-x-1 transition-colors"
                                >
                                  <TrashIcon className="w-4 h-4" />
                                  <span>Remove</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="py-4 px-6 text-center text-gray-500">
                            No users found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                {/* Pagination */}
                {filteredUsers.length > usersPerPage && (
                  <div className="bg-white px-6 py-4 border-t border-gray-200">
                    {renderPagination()}
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Users;