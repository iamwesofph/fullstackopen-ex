import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
};

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
};

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    return request.then((response) => response.data);
};

const remove = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then((response) => {
        console.log("Status Code:", response.status); // Logging the status code
        console.log("Data:", response.data); // Logging the status code
        return response.data;
    });
};

export default {
    getAll,
    create,
    update,
    remove,
};

// &appid=9a2dfab6d7a7bce0d71de09843d88c93
