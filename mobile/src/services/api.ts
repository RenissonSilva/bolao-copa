import axios from 'axios';

export const api = axios.create({
    // Para ver seu endereço IP, basta olhar no expo, ao executar ele é mostrado
    baseURL: 'http://10.0.2.2:3333'
})