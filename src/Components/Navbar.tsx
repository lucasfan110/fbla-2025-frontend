import AuthenticationModals from "./AuthenticationModals";
import "./Navbar.scss";
import UserAuthentication from "./UserAuthentication";

export default function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar__item navbar__justify-left">
                    <div className="navbar__logo">
                        FC
                        <span className="navbar__second-c">C</span>
                    </div>
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
