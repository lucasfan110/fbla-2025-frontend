import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import "./EmployerDashboard.scss";
import PostingCard from "../../components/PostingCard";

export default function EmployerDashboard() {
    const navigate = useNavigate();

    return (
        <div className="employer-dashboard">
            <div className="employer-dashboard__title">
                <h2>My Postings</h2>
            </div>
            {/* <input placeholder="Search..." /> */}

            <PostingCard
                _id="blah"
                name="Test #1"
                image="https://www.insperity.com/wp-content/uploads/how-to-write-a-job-posting-1200x630-1.png"
                applications={[]}
                employer="blah"
                schools={[]}
                description="blah"
                location="blah"
                tags={["blah#1", "blah #2"]}
            />

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
