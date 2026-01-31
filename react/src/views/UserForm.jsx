import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axiosClient from '../axios-client';
import toast from 'react-hot-toast';

const UserForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosClient.get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
          toast.error('Failed to load user');
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors(null);

    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          toast.success('User updated successfully');
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            Object.keys(response.data.errors).forEach(key => {
              response.data.errors[key].forEach(error => {
                toast.error(error);
              });
            });
          } else {
            toast.error('An error occurred. Please try again.');
          }
        });
    } else {
      axiosClient.post('/users', user)
        .then(() => {
          toast.success('User created successfully');
          navigate('/users');
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
            Object.keys(response.data.errors).forEach(key => {
              response.data.errors[key].forEach(error => {
                toast.error(error);
              });
            });
          } else {
            toast.error('An error occurred. Please try again.');
          }
        });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {user.id ? `Edit User: ${user.name}` : 'Create New User'}
          </h1>
          <p className="mt-1 text-sm text-gray-600">
            {user.id ? 'Update user information' : 'Add a new user to the system'}
          </p>
        </div>
        <button
          onClick={() => navigate('/users')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Users
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="p-8 space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  id="name"
                  type="text"
                  value={user.name}
                  onChange={ev => setUser({ ...user, name: ev.target.value })}
                  placeholder="John Doe"
                  className={`appearance-none block w-full px-4 py-3 border ${
                    errors?.name ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150`}
                />
                {errors?.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name[0]}</p>
                )}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  onChange={ev => setUser({ ...user, email: ev.target.value })}
                  placeholder="john@example.com"
                  className={`appearance-none block w-full px-4 py-3 border ${
                    errors?.email ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150`}
                />
                {errors?.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password {!user.id && '*'}
                </label>
                <input
                  id="password"
                  type="password"
                  value={user.password}
                  onChange={ev => setUser({ ...user, password: ev.target.value })}
                  placeholder={user.id ? 'Leave blank to keep current password' : '••••••••'}
                  className={`appearance-none block w-full px-4 py-3 border ${
                    errors?.password ? 'border-red-500' : 'border-gray-300'
                  } rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150`}
                />
                {errors?.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password[0]}</p>
                )}
              </div>

              <div>
                <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password {!user.id && '*'}
                </label>
                <input
                  id="password_confirmation"
                  type="password"
                  value={user.password_confirmation}
                  onChange={ev => setUser({ ...user, password_confirmation: ev.target.value })}
                  placeholder={user.id ? 'Leave blank to keep current password' : '••••••••'}
                  className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/users')}
                className="px-6 py-3 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 transform hover:scale-[1.02]"
              >
                {user.id ? 'Update User' : 'Create User'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default UserForm
