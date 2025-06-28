import { Link, useNavigate } from "react-router-dom";
import AuthenticationModals from "./AuthenticationModals";
import Button from "./Button";
import "./Navbar.scss";
import UserAuthentication from "./UserAuthentication";
import useAuth from "../hooks/useAuth";
import { useContext, useEffect } from "react";
import { UserAuthFormContext } from "../contexts/UserAuthFormContext";
import LoadingText from "./LoadingText";

function isInApplicationsPage(): boolean {
    return /^#\/dashboard\/postings\/[^/]+\/applications$/.test(
        window.location.hash
    );
}

export default function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const {
        startRanking,
        resetRankingState,
        state: { aiRankingState },
    } = useContext(UserAuthFormContext);

    useEffect(() => {
        if (!isInApplicationsPage() && aiRankingState !== "not-ranked") {
            resetRankingState();
        }
    });

    return (
        <>
            <nav className="navbar">
                <div className="navbar__container">
                    <div className="navbar__item navbar__justify-left">
                        <Button
                            className="navbar__logo-btn"
                            onClick={() => navigate("/dashboard")}
                        >
                            <img src="/logo.png" className="navbar__logo" />
                        </Button>
                    </div>
                    <div className="navbar__item navbar__justify-center">
                        {window.location.hash !== "#/" && (
                            <Link to="/dashboard" className="navbar__link">
                                Dashboard
                            </Link>
                        )}

                        {user?.role === "student" && (
                            <Link
                                to="/my-applications"
                                className="navbar__link"
                            >
                                My Applications
                            </Link>
                        )}
                        {user?.role === "admin" && (
                            <>
                                <Link
                                    to="/admin/student-management"
                                    className="navbar__link"
                                >
                                    Student Management
                                </Link>
                                <Link
                                    to="/admin/analysis"
                                    className="navbar__link"
                                >
                                    Analysis
                                </Link>
                            </>
                        )}
                    </div>
                    <div className="navbar__item navbar__justify-right">
                        {isInApplicationsPage() && (
                            <Button
                                variation="rainbow"
                                onClick={startRanking}
                                disabled={aiRankingState !== "not-ranked"}
                            >
                                {
                                    {
                                        "not-ranked": "AI Rank Applicants",
                                        ranking: (
                                            <LoadingText customText="Ranking" />
                                        ),
                                        ranked: "Ranked!",
                                    }[aiRankingState]
                                }
                            </Button>
                        )}

                        <UserAuthentication />
                    </div>
                </div>
            </nav>
            <AuthenticationModals />
        </>
    );
}
