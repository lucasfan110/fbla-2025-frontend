import Button from "./Button";
import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__item navbar__justify-left">
                FBLA 2025 Website Coding & Development Project
            </div>
            <div className="navbar__item navbar__justify-center"></div>
            <div className="navbar__item navbar__justify-right">
                <Button>Log In</Button>
                <Button variation="primary">Sign Up</Button>
            </div>
        </nav>
    );
}
