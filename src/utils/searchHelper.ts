import backend from "../api/backend";
import Posting from "../types/Posting";
import getAuthToken from "./getAuthToken";

export async function search(
    userId: string,
    query: string,
    params?: object
): Promise<Posting[]> {
    const queriedPostings: Posting[] = (
        await backend.get(`/users/${userId}/postings/search`, {
            params: {
                q: query,
                ...params,
            },
            headers: {
                Authorization: getAuthToken(),
            },
        })
    ).data.data;

    return queriedPostings;
}

export function highlightMatchedParts(
    postings: Posting[],
    query: string
): Posting[] {
    return postings.map(posting => {
        const regex = new RegExp(query, "ig");
        const newName = posting.name.replace(regex, value => {
            return `<strong>${value}</strong>`;
        });
        const newDescription = posting.description?.replace(regex, value => {
            return `<strong>${value}</strong>`;
        });
        const newTags = posting.tags?.map(tag => {
            return tag.replace(regex, value => {
                return `<strong>${value}</strong>`;
            });
        });

        return {
            ...posting,
            name: newName,
            tags: newTags,
            description: newDescription,
        };
    });
}
