import axios from 'axios';

import { responseInterceptor } from '../interceptors';
import { Environment } from '../../environment';

export const Api = () => {

    const api = axios.create({
        baseURL: Environment.BASE_URL,
        headers: {
            authorization: `Bearer ${JSON.parse(localStorage.getItem('token') || '""')}`
        }
    });

    api.interceptors.response.use(
        (response) => responseInterceptor(response)
    );

    return api;
};

