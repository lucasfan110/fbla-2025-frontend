import { Link, useNavigate } from "react-router-dom";
import AuthenticationModals from "./AuthenticationModals";
import Button from "./Button";
import "./Navbar.scss";
import UserAuthentication from "./UserAuthentication";
import useAuth from "../hooks/useAuth";

export default function Navbar() {
    const navigate = useNavigate();
    const { user } = useAuth();

    return (
        <>
            <nav className="navbar">
                <div className="navbar__item navbar__justify-left">
                    <Button
                        className="navbar__logo-btn"
                        onClick={() => navigate("/dashboard")}
                    >
                        <div className="navbar__logo">
                            FC
                            <span className="navbar__second-c">C</span>
                        </div>
                    </Button>
                </div>
                <div className="navbar__item navbar__justify-center">
                    {user?.role === "student" && (
                        <Link to="/my-applications" className="navbar__link">
                            My Applications
                        </Link>
                    )}
                    {user?.role === "admin" && (
                        <Link
                            to="/admin/student-management"
                            className="navbar__link"
                        >
                            Student Management
                        </Link>
                    )}
                </div>
                <div className="navbar__item navbar__justify-right">
                    <UserAuthentication />
                </div>
            </nav>
            <AuthenticationModals />
        </>
    );
}
