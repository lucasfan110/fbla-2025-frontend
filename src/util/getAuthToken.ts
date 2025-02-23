export default function getAuthToken() {
    return `Bearer ${localStorage.getItem("jwt")}`;
}
