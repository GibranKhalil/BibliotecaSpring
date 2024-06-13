import axios from 'axios';

const mainRoute = axios.create({
    baseURL:
        'http://localhost:8081/',
});
export default mainRoute;