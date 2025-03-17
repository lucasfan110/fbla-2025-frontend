import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../../api/backend";
import Button from "../../components/Button";
import PostingCardList from "../../components/PostingCardList";
import { useAuthVerified } from "../../hooks/useAuth";
import Posting from "../../types/Posting";
import getAuthToken from "../../util/getAuthToken";
import "./EmployerDashboard.scss";

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
            <h2 style={{ textAlign: "center" }}>Employer Dashboard</h2>

            <div className="employer-dashboard__title">
                <h2>My Postings</h2>
            </div>
            {/* <input placeholder="Search..." /> */}

            <PostingCardList postingsList={postings} showApplicationCount />

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
