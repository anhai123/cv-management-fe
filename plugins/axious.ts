import axios from 'axios';
import { useToast } from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-bootstrap.css';
import https from '~/service/Base/axiousInstance';
import { formatTime, formatDate, getKeyByValue, splitArrayByStatusCV, capitalize, getVietNameseText, getAllowedUpdateStatus, checkIfAllowedUpdateStatus } from '~/assets/js/helper.js';
export default defineNuxtPlugin((nuxtApp) => {
    const toast = useToast();

    // Request interceptor
    https.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${typeof localStorage !== 'undefined' ? localStorage.getItem('token') : ''}`;

            // Do something before request is sent
            config.headers.Authorization = `Bearer ${typeof localStorage !== 'undefined' ? localStorage.getItem('token') : ''}`;
            return config;
        },
        (error) => {
            // Handle request error
            toast.error('Request error: ' + error.message, { duration: 5000 }); // Adjust the duration here
            const status = error.response ? error.response.status : null;

            if (status === 401) {
                // const newToken = "tempToken";
                // localStorage.setItem('authToken', newToken);
                // Retry the original request
                return axios(error.config);
            } else if (status === 404) {
                // Handle not found errors
            } else {
                // Handle other errors
            }
            return Promise.reject(error);
        },
    );

    // Response interceptor
    https.interceptors.response.use(
        (response) => {
            console.log('response', response);
            // Handle successful response
            if (response.config.method != 'get' && response.data.message && String(response.data.statusCode).startsWith('2')) {
                toast.success('Request successful: ' + response.data.message, { duration: 5000 }); // Adjust the duration here
            }

            if (response.config.method != 'get' && response.data.statusCode == 401) {
                toast.error('Unauthorized: ' + response.data.message, { duration: 5000 }); // Adjust the duration here
            }

            if (response.config.method != 'get' && response.data.statusCode == 404) {
                toast.error('Not Found: ' + response.data.message, { duration: 5000 }); // Adjust the duration here
            }

            if (response.config.method != 'get' && response.data.statusCode == 500) {
                toast.error('Server Error: ' + response.data.message, { duration: 5000 }); // Adjust the duration here
            }

            return response;
        },
        (error) => {
            console.log('error', error);
            var messageError = '';

            // {field: 'Trường', message: 'Trường phải là bắt buộc!'} hoặc {message: 'Trường phải là bắt buộc!'} hoặc {status: 400,message: 'Trường phải là một số hợp lệ!'}

            if (typeof error.response.data.errors == 'object' && error.response.data.errors !== null) {
                const errors = error.response.data.errors;
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        messageError += `${key}: ${errors[key]}<br/>`;
                    }
                }
                toast.error('Response error: <br/>' + messageError, { duration: 5000 }); // Adjust the duration here
            } else if (typeof error.response.data === 'string') {
                toast.error('Response error: <br/>' + error.response.data, { duration: 5000 }); // Adjust the duration here
            } else if (typeof error.response.data === 'object' && error.response.data !== null) {
                toast.error('Response error: <br/>' + error.response.data.message, { duration: 5000 }); // Adjust the duration here
            } else {
                toast.error('Response error: <br/>' + 'An unknown error occurred.', { duration: 5000 }); // Adjust the duration here
            }

            return error;
        },
    );

    // Provide the toast instance to your Vue components
    nuxtApp.provide('toast', toast);
});
