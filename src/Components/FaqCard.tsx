import { useState } from "react";
import "./FaqCard.scss";
import classNames from "classnames";

interface Props {
    question: string;
    answer: string;
}

export default function FaqCard({ question, answer }: Props) {
    const [isOpened, setIsOpened] = useState(false);

    return (
        <div
            className={classNames("faq-card", { "faq-card--opened": isOpened })}
            onClick={() => setIsOpened(!isOpened)}
        >
            <h3 className="faq-card__question">
                <div>{question}</div>
                {isOpened ? (
                    <i className="bi bi-chevron-up" />
                ) : (
                    <i className="bi bi-chevron-down" />
                )}
            </h3>
            <div className="faq-card__answer">{answer}</div>
        </div>
    );
}
