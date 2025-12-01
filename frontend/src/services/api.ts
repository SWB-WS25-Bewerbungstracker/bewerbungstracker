import axios, {AxiosHeaders} from 'axios';
import keycloak from '../keycloak';


const applicationTrackerApi = axios.create({
    baseURL:'http://localhost:8080',
})

//Mit Unterstützung von KI
applicationTrackerApi.interceptors.request.use(
    async(config) => {
        // Authorization Header setzen
        if (!config.headers) config.headers = new AxiosHeaders();
        config.headers.Authorization = `Bearer ${keycloak.token}`;
        return config;
    },
    (error) => Promise.reject(error)
)
export default applicationTrackerApi