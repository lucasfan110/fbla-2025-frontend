import { useNavigate } from "react-router-dom";
import AuthenticationModals from "./AuthenticationModals";
import Button from "./Button";
import "./Navbar.scss";
import UserAuthentication from "./UserAuthentication";

export default function Navbar() {
    const navigate = useNavigate();

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
                <div className="navbar__item navbar__justify-center"></div>
                <div className="navbar__item navbar__justify-right">
                    <UserAuthentication />
                </div>
            </nav>
            <AuthenticationModals />
        </>
    );
}
