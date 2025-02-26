import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./EmployerDashboard.scss";
import { useEffect, useState } from "react";
import { Posting } from "../../types/Posting";
import backend from "../../api/backend";
import { useAuthVerified } from "../../hooks/useAuth";
import getAuthToken from "../../util/getAuthToken";
import PostingCardList from "../../components/PostingCardList";

export default function EmployerDashboard() {
    const navigate = useNavigate();
    const { user } = useAuthVerified();

    const [postings, setPostings] = useState<Posting[]>([]);

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
            <div className="employer-dashboard__title">
                <h2>My Postings</h2>
            </div>
            {/* <input placeholder="Search..." /> */}

            <PostingCardList postingsList={postings} />

            <Button
                variation="primary"
                className="employer-dashboard__add-posting-btn"
                onClick={() => navigate("/employer/new-posting")}
            >
                <i className="bi bi-plus-lg" />
            </Button>
        </div>
    );
}
