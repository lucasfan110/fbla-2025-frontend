import { useEffect, useState } from "react";
import ReactModal from "react-modal";
import backend from "../../api/backend";
import Button from "../../components/Button";
import PostingCardList from "../../components/PostingCardList";
import modalStyle, { CLOSE_TIMEOUT_MS } from "../../constants/modalStyle";
import { useAuthVerified } from "../../hooks/useAuth";
import Posting from "../../types/Posting";
import getAuthToken from "../../utils/getAuthToken";
import NewPostingPage from "../NewPostingPage";
import "./EmployerDashboard.scss";

export default function EmployerDashboard() {
    const { user } = useAuthVerified();

    const [postings, setPostings] = useState<Posting[]>([]);
    const [showNewPostingPage, setShowNewPostingPage] = useState(false);

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
                setPostings(res.data.data.postings);
            } else {
                alert("Failed to get postings");
            }
        })();
    }, [user]);

    return (
        <div className="employer-dashboard">
            <h2 style={{ textAlign: "center" }}>Employer Dashboard</h2>

            <div className="employer-dashboard__title">
                <h3>My Postings</h3>
            </div>

            <PostingCardList
                postingsList={postings}
                showApplicationCount
                // onEditPosting={id => setEditPostingIndex(id)}
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
