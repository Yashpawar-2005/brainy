import axios from 'axios'
const axios_instance = axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'},
    withCredentials:true
    });

export default axios_instance;