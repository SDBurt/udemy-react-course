import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-app-cdc9b.firebaseio.com/'
});

export default instance;