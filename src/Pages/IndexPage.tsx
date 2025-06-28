import { useContext } from "react";
import Button from "../components/Button";
import { UserAuthFormContext } from "../contexts/UserAuthFormContext";
import "./IndexPage.scss";
import useAuth from "../hooks/useAuth";
import { Navigate } from "react-router-dom";
import FaqCard from "../components/FaqCard";

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
                    <h2 className="u-text-center">
                        Here Is Why Our Website Is the Best
                    </h2>
                    <div className="index-page__details-row-1 index-page__split">
                        <div className="index-page__split-container">
                            <p>
                                Our job posting platform redefines how employers
                                and job seekers connect by offering a seamless
                                and innovative user experience. Designed with
                                both functionality and engagement in mind, the
                                platform integrates cutting-edge technologies to
                                remove friction from the hiring process. Whether
                                you're posting a position or searching for your
                                next opportunity, the intuitive design ensures
                                that every step—from browsing to applying—is
                                straightforward and enjoyable.
                            </p>
                            <br />
                            <p>
                                One of the platform's standout features is its
                                3D Mapbox integration, which transforms
                                traditional job listings into an interactive,
                                location-based exploration. Users can visually
                                navigate job opportunities on a dynamic map,
                                gaining geographic context and insight into
                                their prospective workplaces. This spatial
                                approach makes it easier than ever to discover
                                roles in desirable areas or avoid locations with
                                long commutes, empowering users to make smarter,
                                more personalized employment decisions.
                            </p>
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
            <section className="features-section">
                <div className="container">
                    <h2 className="section-title">
                        Features That Set Us Apart
                    </h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <span className="icon material-icons">
                                <i className="bi bi-map" />
                            </span>
                            <h3 className="feature-title">
                                Interactive 3D Maps
                            </h3>
                            <p className="feature-description">
                                Visualize job opportunities in your area with
                                our cutting-edge map integration.
                            </p>
                        </div>
                        <div className="feature-card">
                            <span className="icon material-icons">
                                <i className="bi bi-robot" />
                            </span>
                            <h3 className="feature-title">
                                AI-Powered Chatbot
                            </h3>
                            <p className="feature-description">
                                Get instant assistance and guidance throughout
                                your job search or hiring process.
                            </p>
                        </div>
                        <div className="feature-card">
                            <span className="icon material-icons">
                                <i className="bi bi-box-arrow-in-right" />
                            </span>
                            <h3 className="feature-title">Seamless Sign-In</h3>
                            <p className="feature-description">
                                Enjoy secure and easy access with Google OAuth
                                integration for one-click sign-ins.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="index-page__faqs">
                <div className="index-page__details-container">
                    <h2 className="u-text-center">FAQs</h2>
                    <FaqCard
                        question="What makes your job posting website different from others?"
                        answer="Our platform combines cutting-edge technologies like 3D Mapbox, AI-powered chat, and Google OAuth to create a faster, more intuitive, and visually engaging experience for both employers and job seekers."
                    />
                    <FaqCard
                        question="How does the 3D Mapbox feature enhance job searches?"
                        answer="Our 3D Mapbox integration lets users explore job opportunities on an interactive, geographic map — making it easy to visualize openings by location, proximity, and neighborhood context."
                    />
                    <FaqCard
                        question="What can the AI chatbot help me with?"
                        answer="Our AI chatbot acts like your personal assistant — guiding you through job searches, answering questions about postings, assisting with applications, and even helping employers interact with candidates more efficiently."
                    />
                    <FaqCard
                        question="Is signing in secure?"
                        answer="Absolutely. We use Google OAuth for secure, one-click sign-ins — so you can access your account safely without needing to remember another password."
                    />
                    <FaqCard
                        question="Do I need to create a separate account to use the platform?"
                        answer="No need — you can sign in instantly using your existing Google account, making access simple and hassle-free."
                    />
                    <FaqCard
                        question="How does this benefit employers?"
                        answer="Employers can post jobs, interact with candidates, and manage applications seamlessly, all while providing an innovative experience that attracts high-quality applicants."
                    />
                    <FaqCard
                        question="Is the platform mobile-friendly?"
                        answer="Yes. Our platform is fully optimized for mobile and desktop, ensuring a smooth experience on any device."
                    />
                </div>
            </section>
        </main>
    );
}
