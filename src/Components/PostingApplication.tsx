import { useState } from "react";
import Button from "./Button";
import FormTextArea from "./FormTextArea";
import backend from "../api/backend";
import { useAuthVerified } from "../hooks/useAuth";
import getAuthToken from "../utils/getAuthToken";
import { useNavigate } from "react-router-dom";
import "./PostingApplication.scss";

interface Props {
    postingId: string;
}

export default function PostingApplication({ postingId }: Props) {
    const [answer, setAnswer] = useState("");
    const navigate = useNavigate();
    const { user } = useAuthVerified();

    async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const res = await backend.post(
            `/users/${user._id}/postings/${postingId}/applications`,
            { response: answer },
            {
                headers: {
                    Authorization: getAuthToken(),
                },
            }
        );

        if (res.data.status === "success") {
            alert("Application submitted!");
            navigate("/dashboard");
        } else {
            alert("Failed to submit application!");
        }
    }

    return (
        <div className="posting-application">
            <form onSubmit={onFormSubmit}>
                <FormTextArea
                    label="Why do you want to apply for this posting, and why do you think you are a good fit for it?"
                    placeholder="Type your answer here..."
                    id="response"
                    className="posting-application__form-input"
                    value={answer}
                    required
                    onChange={e => {
                        setAnswer(e.target.value);
                    }}
                />
                <Button variation="primary">Apply!</Button>
            </form>
        </div>
    );
}
