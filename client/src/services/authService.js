import API from "./api";

export const loginUser = async (email, password) => {
    const response = await API.post("/Auth/login", {
        email,
        password
    });

    return response.data;
};

export const registerUser = async (userData) => {
    const response = await API.post("/Auth/register", userData);
    return response.data;
};

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get("/Auth/profile", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const saveTransaction = async (transactionData) => {
    const token = localStorage.getItem("token");

    const response = await API.post("/Transaction/add", transactionData, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};

export const getTransactions = async () => {
    const token = localStorage.getItem("token");

    const response = await API.get("/Transaction/all", {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return response.data;
};