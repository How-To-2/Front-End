import axios from 'axios';

const axiosWithAuth = () => {
    const token = localStorage.getItem('token');

    return axios.create({
        baseURL: 'https://how-to-api-2.herokuapp.com/',
        headers: {
            Authorization: token
        }
    });
};

export default axiosWithAuth;