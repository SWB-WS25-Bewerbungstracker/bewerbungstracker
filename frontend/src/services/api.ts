import axios from 'axios';
import keycloak from '../keycloak';


const applicationTrackerApi = axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        'Content-Type':'application/json',
    },
});

//With support from AI
//Adding current JWT to requests
applicationTrackerApi.interceptors.request.use(
    (config) => {
        // Authorization Header setzen
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
    },
    (error) => Promise.reject(error)
)
export default applicationTrackerApi