import axios from 'axios';
import Cookies from 'js-cookie';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://supkem-drf.onrender.com';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/v1`, // Using the provided production URL
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    const token = Cookies.get('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refreshToken = Cookies.get('refresh_token');
                const response = await axios.post('https://supkem-drf.onrender.com/api/v1/token/refresh/', {
                    refresh: refreshToken,
                });
                const { access } = response.data;
                Cookies.set('access_token', access);
                api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
                return api(originalRequest);
            } catch (err) {
                // Token refresh failed, redirect to login
                Cookies.remove('access_token');
                Cookies.remove('refresh_token');
                if (typeof window !== 'undefined') {
                    window.location.href = '/login';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default api;
