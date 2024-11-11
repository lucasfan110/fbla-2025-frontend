import "./Navbar.scss";

export default function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__item navbar__justify-left">
                FBLA 2025 Website Coding & Development Project
            </div>
            <div className="navbar__item navbar__justify-center">
                <input></input>
            </div>
            <div className="navbar__item navbar__justify-right">
                <button>Log In</button>
                <button>Sign Up</button>
            </div>
        </nav>
    );
}
