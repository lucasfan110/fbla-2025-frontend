import Button from "../Components/Button";
import "./IndexPage.scss";

export default function IndexPage() {
    return (
        <main className="index-page">
            <section className="index-page__introduction">
                <div className="index-page__text-intro">
                    <h2>Job searching has never been easier</h2>
                    <p>
                        A cutting-edge platform designed to bring together job
                        seekers, industry professionals, and employers in one
                        seamless ecosystem.
                    </p>
                    <Button
                        variation="primary"
                        className="index-page__get-started-btn"
                    >
                        Get Started
                    </Button>
                </div>
                <div>
                    <img
                        src="https://storage.googleapis.com/joblist-content/hero-images/best-jobs-for-avoiding-office.jpg"
                        alt="background"
                    />
                </div>
            </section>
        </main>
    );
}
