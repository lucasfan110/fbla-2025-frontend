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
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Beatae dicta neque asperiores iste nisi
                            debitis rerum, tempora, fugit consectetur quam et,
                            accusamus doloremque quo. Illo non est et nam
                            consequatur. Illo, qui ad? Blanditiis sapiente
                            ducimus quam consectetur aliquam eum, reprehenderit,
                            sit error ipsum sed consequuntur cum numquam
                            necessitatibus. Saepe libero ipsa voluptatum magni
                            eligendi aperiam fugiat impedit optio et. Excepturi
                            itaque modi debitis doloribus recusandae maxime
                            labore sed autem voluptatem, eveniet id illo iusto
                            vero? Amet iure nam quia consequatur doloremque
                            dolor minus impedit aperiam itaque est, soluta
                            veritatis.
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
