import axios from "axios";

const aiBackend = axios.create({
    baseURL: "https://5d8a-47-42-202-231.ngrok-free.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default aiBackend;
