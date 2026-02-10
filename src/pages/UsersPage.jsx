import React, { useCallback, useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api/users';
import DynamicForm from '../components/DynamicForm';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userSchema = [
    {
        name: 'firstName',
        label: 'First Name',
        required: true,
        placeholder: 'Enter first name',
        pattern: "^[A-Za-z]+$",
        errorMessage: "First name should only contain letters"
    },
    {
        name: 'lastName',
        label: 'Last Name',
        required: true,
        placeholder: 'Enter last name',
        pattern: "^[A-Za-z]+$",
        errorMessage: "Last name should only contain letters"
    },
    {
        name: 'email',
        label: 'Email',
        type: 'email',
        required: true,
        placeholder: 'Enter email address',
        pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
        errorMessage: "Please enter a valid email address"
    },
    {
        name: 'phone',
        label: 'Phone Number',
        type: 'tel',
        required: true,
        placeholder: 'Enter phone number',
        pattern: "^\\d{10}$",
        errorMessage: "Phone number must be 10 digits"
    },
    // Add new fields here for extensibility
];

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingUser, setEditingUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = useCallback(async () => {
        try {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
        } catch (err) {
            toast.error('Failed to fetch users. Is the backend running?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handlAddUser = () => {
        setEditingUser(null);
        setIsFormOpen(true);
    };

    const handleEditUser = (user) => {
        setEditingUser(user);
        setIsFormOpen(true);
    };

    const handleDeleteUser = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                await deleteUser(id);
                setUsers(users.filter((u) => u.id !== id));
                toast.success('User deleted successfully');
            } catch (err) {
                toast.error('Failed to delete user');
                console.error(err);
            }
        }
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (editingUser) {
                const updated = await updateUser(editingUser.id, formData);
                setUsers(users.map((u) => (u.id === editingUser.id ? updated : u)));
                toast.success('User updated successfully');
            } else {
                const created = await createUser(formData);
                setUsers([...users, created]);
                toast.success('User created successfully');
            }
            setIsFormOpen(false);
        } catch (err) {
            toast.error('Failed to save user');
            console.error(err);
        }
    };

    return (
        <div className="container mx-auto p-6 animate-fade-in animate-duration-500">
            <ToastContainer position="top-right" autoClose={3000} />
            <header className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800">User Management</h1>
                <button
                    onClick={handlAddUser}
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-95"
                >
                    <Plus size={20} />
                    Add User
                </button>
            </header>

            {!loading ? (
                <div className="flex justify-center py-20">
                    <div className="glass-card px-10 py-8 rounded-2xl flex flex-col items-center">
                        <div className="w-10 h-10 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                        <p className="mt-4 text-gray-600 text-sm font-medium">Loading users...</p>
                    </div>
                </div>
            ) : (
                <div className="animate-fade-up animate-duration-500">
                    {/* Desktop View: Table */}
                    <div className="hidden md:block bg-white shadow-md rounded-lg overflow-hidden mb-16">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    {userSchema.map((field) => (
                                        <th
                                            key={field.name}
                                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        >
                                            {field.label}
                                        </th>
                                    ))}
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                        {userSchema.map((field) => (
                                            <td key={field.name} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {user[field.name]}
                                            </td>
                                        ))}
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleEditUser(user)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4 cursor-pointer hover:scale-110 transition-transform"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user.id)}
                                                className="text-red-600 hover:text-red-900 cursor-pointer hover:scale-110 transition-transform"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && (
                                    <tr>
                                        <td colSpan={userSchema.length + 1} className="px-6 py-10 text-center text-gray-500">
                                            No users found. Click "Add User" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View: Cards */}
                    <div className="md:hidden grid grid-cols-1 gap-4 mb-24">
                        {users.map((user) => (
                            <div key={user.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500 animate-fade-up">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900">{user.firstName} {user.lastName}</h3>
                                        <p className="text-sm text-gray-500">{user.email}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditUser(user)}
                                            className="p-2 text-indigo-600 bg-indigo-50 rounded-full hover:bg-indigo-100 transition-colors"
                                        >
                                            <Pencil size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteUser(user.id)}
                                            className="p-2 text-red-600 bg-red-50 rounded-full hover:bg-red-100 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm text-gray-700">
                                    {userSchema.filter(f => !['firstName', 'lastName', 'email'].includes(f.name)).map(field => (
                                        <div key={field.name} className="flex justify-between">
                                            <span className="font-medium text-gray-500">{field.label}:</span>
                                            <span>{user[field.name]}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                        {users.length === 0 && (
                            <div className="text-center py-10 text-gray-500 bg-white rounded-lg shadow-sm">
                                <p>No users found.</p>
                                <p className="text-sm">Click "Add User" to create one.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {isFormOpen && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in animate-duration-200">
                    <div className="relative w-full max-w-md animate-fade-up animate-duration-500">
                        <button
                            onClick={() => setIsFormOpen(false)}
                            className="absolute cursor-pointer -top-12 right-0 text-white hover:text-gray-200 transition-colors hover:rotate-90"
                        >
                            <X size={24} />
                        </button>
                        <DynamicForm
                            schema={userSchema}
                            initialValues={editingUser}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setIsFormOpen(false)}
                            title={editingUser ? 'Edit User' : 'Add New User'}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsersPage;
