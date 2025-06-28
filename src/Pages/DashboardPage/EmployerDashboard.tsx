import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import backend from "../../api/backend";
import Button from "../../components/Button";
import PostingCardList from "../../components/PostingCardList";
import SearchInput from "../../components/SearchInput";
import modalStyle, { CLOSE_TIMEOUT_MS } from "../../constants/modalStyle";
import { useAuthVerified } from "../../hooks/useAuth";
import usePreventScrolling from "../../hooks/usePreventScrolling";
import Posting from "../../types/Posting";
import getAuthToken from "../../utils/getAuthToken";
import { highlightMatchedParts, search } from "../../utils/searchHelper";
import NewPostingPage from "../NewPostingPage";
import "./EmployerDashboard.scss";

export default function EmployerDashboard() {
    const { user } = useAuthVerified();

    // const [postings, setPostings] = useState<Posting[]>([]);
    const allPostings = useRef<Posting[]>([]);
    const [displayedPostings, setDisplayedPostings] = useState<Posting[]>([]);
    const [showNewPostingPage, setShowNewPostingPage] = useState(false);
    const [query, setQuery] = useState("");

    usePreventScrolling(showNewPostingPage);

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

        const queriedPostings = await search(user._id, trimmedQuery, {
            owner: user._id,
        });
        const postingsToRender = highlightMatchedParts(
            queriedPostings,
            trimmedQuery
        );

        setDisplayedPostings(postingsToRender);
    }

    useEffect(() => {
        (async () => {
            const res = await backend.get(`/users/${user._id}/postings`, {
                params: {
                    owner: user._id,
                },
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            if (res.data.status === "success") {
                allPostings.current = res.data.data.postings;
                setDisplayedPostings(res.data.data.postings);
            } else {
                alert("Failed to get postings");
            }
        })();
    }, [user]);

    return (
        <div className="employer-dashboard">
            <h1 style={{ textAlign: "center" }}>Employer Dashboard</h1>

            <div className="employer-dashboard__title">
                <h3>My Postings</h3>
            </div>

            <SearchInput
                onSearchInputSubmit={onSearchInputSubmit}
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {(() => {
                if (allPostings.current.length === 0) {
                    return (
                        <p className="u-gray-text">
                            You don't have any postings! Click the blue "+"
                            button at the bottom right corner to add a posting!
                        </p>
                    );
                } else if (displayedPostings.length === 0) {
                    return <p className="u-gray-text">No posting found!</p>;
                }
            })()}

            <PostingCardList
                postingsList={displayedPostings}
                showApplicationCount
            />

            <Button
                variation="primary"
                className="employer-dashboard__add-posting-btn"
                onClick={() => setShowNewPostingPage(true)}
            >
                <i className="bi bi-plus-lg" />
            </Button>

            <ReactModal
                isOpen={showNewPostingPage}
                contentLabel="New Posting Modal"
                style={modalStyle}
                onRequestClose={() => setShowNewPostingPage(false)}
                shouldCloseOnOverlayClick={true}
                closeTimeoutMS={CLOSE_TIMEOUT_MS}
            >
                <Button
                    onClick={() => setShowNewPostingPage(false)}
                    className="modal-close-button"
                >
                    <i className="bi bi-x-lg modal-close-button__icon" />
                </Button>
                <NewPostingPage />
            </ReactModal>
        </div>
    );
}
