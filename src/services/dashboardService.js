import api from './api';

export const getDashboardStats = async () => {
    try {
        const response = await api.get('/admin/dashboard/stats');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getRecentOrders = async () => {
    try {
        const response = await api.get('/admin/orders/recent');
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getTopProducts = async () => {
    try {
        const response = await api.get('/admin/products/top');
        return response.data;
    } catch (error) {
        throw error;
    }
};
