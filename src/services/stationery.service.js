import api from './api';

const StationeryService = {
    // Get all products
    getAllProducts: async () => {
        try {
            const response = await api.get('/products');
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Get product by ID
    getProductById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new product (admin only)
    createProduct: async (productData) => {
        try {
            const response = await api.post('/products', productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Update a product (admin only)
    updateProduct: async (id, productData) => {
        try {
            const response = await api.put(`/products/${id}`, productData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a product (admin only)
    deleteProduct: async (id) => {
        try {
            const response = await api.delete(`/products/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
};

export default StationeryService;
