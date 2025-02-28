import { useContext } from "react";
import Button from "../components/Button";
import { UserAuthFormContext } from "../context/UserAuthFormContext";
import "./IndexPage.scss";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

export default function IndexPage() {
    const { openSignUpModal } = useContext(UserAuthFormContext);
    const { user } = useAuth();

    if (user) {
        return <Navigate to="/dashboard" replace />;
    }

    return (
        <main className="index-page">
            <section className="index-page__introduction index-page__split">
                <div className="index-page__text-intro index-page__split-container">
                    <h2 className="index-page__title">
                        Job searching has never been easier
                    </h2>
                    <p>
                        A cutting-edge platform designed to bring together job
                        seekers, industry professionals, and employers in one
                        seamless ecosystem.
                    </p>
                    <Button
                        variation="primary"
                        className="index-page__get-started-btn"
                        onClick={openSignUpModal}
                    >
                        Get Started
                    </Button>
                </div>
                <div className="index-page__split-container">
                    <img
                        src="https://storage.googleapis.com/joblist-content/hero-images/best-jobs-for-avoiding-office.jpg"
                        alt="background"
                    />
                </div>
            </section>
            <section className="index-page__details">
                <div className="index-page__details-container">
                    <h2>Here Is Why Our Website Is the Best</h2>
                    <div className="index-page__details-row-1 index-page__split">
                        <div className="index-page__split-container">
                            Our job posting website stands out as the best
                            choice for both employers and job seekers, offering
                            an innovative and seamless experience with
                            cutting-edge features. With 3D Mapbox integration,
                            users can visually explore job opportunities in an
                            interactive, geographic format, making
                            location-based job searches more intuitive than
                            ever. Our AI-powered chatbot provides instant
                            assistance, guiding users through job searches,
                            applications, and employer interactions, ensuring a
                            smooth and efficient hiring process. Additionally,
                            Google OAuth integration allows for secure,
                            one-click sign-ins, eliminating the hassle of
                            lengthy registrations and making the platform more
                            accessible. By combining advanced technology with
                            user-friendly functionality, our platform
                            revolutionizes job searching, providing an engaging
                            and efficient experience like no other.
                        </div>
                        <div className="index-page__split-container">
                            <img
                                src="https://www.debt.org/wp-content/uploads/2020/06/shutterstock_682454728-1.jpg"
                                alt="background"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
