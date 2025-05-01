import axios from "axios";
const API_URL=" http://localhost:4000/api/tasks";
const token = localStorage.getItem("token");
export const createTask = async (taskData) => {
    try {
        const response = await axios.post(API_URL, taskData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Failed to create task");
    }
    }
    export const getTasks = async () => {
        try {
            const response = await axios.get(API_URL, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to fetch tasks");
        }
    }
    export const updateTask = async (taskId, taskData) => {
        try {
            const response = await axios.put(`${API_URL}/${taskId}`, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to update task");
        }
    }
    export const deleteTask = async (taskId) => {
        try {
            const response = await axios.delete(`${API_URL}/${taskId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || "Failed to delete task");
        }
    }