import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5134/api"
});

export default API;