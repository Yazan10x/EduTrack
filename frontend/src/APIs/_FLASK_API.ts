// axiosInstance.ts
import axios from "axios";
import { auth } from "../utils/firebase/firebaseConfig";

// Automatically select the correct API base URL from environment variables
const FLASK_API_ADDRESS = process.env.REACT_APP_FLASK_API_ADDRESS;

const axiosInstance = axios.create({
    baseURL: FLASK_API_ADDRESS,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    async (config) => {
        const user = auth.currentUser;
        if (user) {
            const token = await user.getIdToken();
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;