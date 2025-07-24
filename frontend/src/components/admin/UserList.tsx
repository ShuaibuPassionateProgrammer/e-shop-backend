import React, { useState } from 'react';
import { User } from '../../types';
import { useGetUsersQuery, useDeleteUserMutation, useCreateUserMutation, useUpdateUserMutation } from '../../store/features/users/userSlice';
import UserForm from './UserForm';

export default function UserList() {
  const { data, error, isLoading } = useGetUsersQuery({});
  const [deleteUser] = useDeleteUserMutation();
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id).unwrap();
      } catch (err) {
        console.error('Failed to delete the user: ', err);
      }
    }
  };

  const handleSave = async (userData: Partial<User>) => {
    try {
      if (selectedUser) {
        await updateUser({ id: selectedUser._id, ...userData }).unwrap();
      } else {
        await createUser(userData).unwrap();
      }
      setIsModalOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error('Failed to save the user: ', err);
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleAddNew = () => {
    setSelectedUser(null);
    setIsModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users.</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Management</h2>
        <button onClick={handleAddNew} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Add User
        </button>
      </div>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">ID</th>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Role</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.users.map((user: User) => (
            <tr key={user._id}>
              <td className="border px-4 py-2">{user._id}</td>
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.role}</td>
              <td className="border px-4 py-2">
                <button onClick={() => handleEdit(user)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">Edit</button>
                <button onClick={() => handleDelete(user._id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <UserForm
          user={selectedUser}
          onSave={handleSave}
          onCancel={() => {
            setIsModalOpen(false);
            setSelectedUser(null);
          }}
        />
      )}
    </div>
  );
}
