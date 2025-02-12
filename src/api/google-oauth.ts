import axios from "axios";

export interface GoogleAccountInfo {
    email: string;
    email_verified: boolean;
    given_name: string;
    name: string;
    picture: string;
    sub: string;
}

const googleOauth = axios.create({
    baseURL: "https://www.googleapis.com/oauth2/v3",
});

export default googleOauth;
