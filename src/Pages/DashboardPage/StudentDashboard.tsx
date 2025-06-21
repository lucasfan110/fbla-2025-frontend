import { useEffect, useRef, useState } from "react";
import backend from "../../api/backend";
import Input from "../../components/Input";
import PostingCardList from "../../components/PostingCardList";
import { useAuthVerified } from "../../hooks/useAuth";
import Posting from "../../types/Posting";
import getAuthToken from "../../utils/getAuthToken";
import "./StudentDashboard.scss";

export default function StudentDashboard() {
    const allPostings = useRef<Posting[]>([]);
    const [displayedPostings, setDisplayedPostings] = useState<Posting[]>([]);
    const [query, setQuery] = useState("");
    const { user } = useAuthVerified();

    useEffect(() => {
        (async () => {
            const res = await backend.get(`/users/${user._id}/postings`, {
                params: {
                    schools: user.school,
                    status: "approved",
                },
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            const postings = res.data.data.postings;

            allPostings.current = res.data.data.postings;
            setDisplayedPostings(postings);
        })();
    }, [user]);

    useEffect(() => {
        if (!query) {
            setDisplayedPostings(allPostings.current);
        }
    }, [query]);

    async function onSearchInputSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!query) {
            return;
        }

        const trimmedQuery = query.trim();

        const queriedPostings: Posting[] = (
            await backend.get(`/users/${user._id}/postings/search`, {
                params: {
                    q: trimmedQuery,
                },
                headers: {
                    Authorization: getAuthToken(),
                },
            })
        ).data.data;

        const postingsToRender = queriedPostings.map(posting => {
            const regex = new RegExp(trimmedQuery, "ig");
            const newName = posting.name.replace(regex, value => {
                return `<strong>${value}</strong>`;
            });
            const newDescription = posting.description?.replace(
                regex,
                value => {
                    return `<strong>${value}</strong>`;
                }
            );
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

        setDisplayedPostings(postingsToRender);
    }

    return (
        <div className="student-dashboard">
            <h2 style={{ textAlign: "center" }}>Student Dashboard</h2>
            <div className="student-dashboard__heading">
                <h2>Postings to Apply For</h2>
            </div>

            <form
                className="student-dashboard__search-input-container"
                onSubmit={onSearchInputSubmit}
            >
                <i className="bi bi-search" />
                <Input
                    className="student-dashboard__search-input"
                    placeholder="Search for postings..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
            </form>

            <PostingCardList
                postingsList={displayedPostings}
                showStatus={false}
                readOnly
            />
        </div>
    );
}
