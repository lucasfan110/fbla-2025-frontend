import backend from "../api/backend";
import Resource from "../types/Resource";
import getAuthToken from "./getAuthToken";

export type FormData = {
    name: string;
    image?: string;
    description?: string;
    location?: string;
    schools: string[];
    resources?: Resource[];
    tags?: string[];
};

export async function createPosting(userId: string, data: FormData) {
    return backend.post(`/users/${userId}/postings`, data, {
        headers: {
            Authorization: getAuthToken(),
        },
    });
}

export async function getPostings(userId: string, postingId: string) {
    return backend.get(`/users/${userId}/postings/${postingId}`, {
        headers: {
            Authorization: getAuthToken(),
        },
    });
}

export async function editPosting(
    userId: string,
    postingId: string,
    data: FormData
) {
    return backend.patch(`/users/${userId}/postings/${postingId}`, data, {
        headers: {
            Authorization: getAuthToken(),
        },
    });
}

export async function deletePosting(userId: string, postingId: string) {
    return backend.delete(`/users/${userId}/postings/${postingId}`, {
        headers: {
            Authorization: getAuthToken(),
        },
    });
}
