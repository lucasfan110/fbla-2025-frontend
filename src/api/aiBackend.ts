import axios from "axios";

const aiBackend = axios.create({
    baseURL: "https://f91a-47-42-202-231.ngrok-free.app",
    headers: {
        "Content-Type": "application/json",
    },
});

export default aiBackend;
