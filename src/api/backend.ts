import axios from "axios";

const backend = axios.create({
    // baseURL: "http://localhost:8000/api/v1",
    baseURL: "https://0453-71-93-137-25.ngrok-free.app/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
});

export default backend;
