import axios from 'axios';

export const API_BASE_URL = () => {
    // return 'https://backendtest-h9eq.onrender.com'
    return 'http://localhost:5000'
}

export const getUsers = async () => {
    const response = await axios.get(API_BASE_URL() + '/users');
    return response.data;
};

export const getUser = async (id) => {
    const response = await axios.get(API_BASE_URL() + `/users/${id}`);
    return response.data;
};

export const createUser = async (user) => {
    const response = await axios.post(API_BASE_URL() + '/users', user);
    return response.data;
};

export const updateUser = async (id, user) => {
    const response = await axios.put(API_BASE_URL() + `/users/${id}`, user);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axios.delete(API_BASE_URL() + `/users/${id}`);
    return response.data;
};
