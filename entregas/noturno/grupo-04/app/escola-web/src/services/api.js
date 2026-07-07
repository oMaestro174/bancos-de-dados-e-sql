import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000' // Ajuste para a porta correta do seu servidor
});

export default api;