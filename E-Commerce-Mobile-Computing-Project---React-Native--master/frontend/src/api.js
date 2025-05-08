import axios from 'axios';

const BASE_URL = 'http://localhost:3000/api';

export const authAPI = {
  signup: async (userData) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/signup`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  login: async (credentials) => {
    try {
      const response = await axios.post(`${BASE_URL}/users/login`, credentials);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export const cartAPI = {
  checkout: async (checkoutData) => {
    try {
      const response = await axios.post(`${BASE_URL}/cart/checkout`, checkoutData);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getTransactions: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/transaction`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
  getTransactionById: async (transactionId) => {
    try {
      const response = await axios.get(`${BASE_URL}/cart/transaction/${transactionId}`);
      return response.data;
    } catch (error) {
      throw error.response?.data || error.message;
    }
  },
};

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
}); 