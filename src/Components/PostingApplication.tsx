import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import backend from "../api/backend";
import { useAuthVerified } from "../hooks/useAuth";
import getAuthToken from "../utils/getAuthToken";
import Button from "./Button";
import FormTextArea from "./FormTextArea";
import "./PostingApplication.scss";
import FormInput from "./FormInput";

interface Props {
    postingId: string;
}

export default function PostingApplication({ postingId }: Props) {
    const [answer, setAnswer] = useState("");
    const [resumeFile, setResumeFile] = useState<File | null>(null);
    const navigate = useNavigate();
    const { user } = useAuthVerified();

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setResumeFile(file);
        }
    }

    async function onFormSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("response", answer);
        formData.append("file", resumeFile as Blob);

        const res = await backend.post(
            `/users/${user._id}/postings/${postingId}/applications`,
            formData,
            {
                headers: {
                    Authorization: getAuthToken(),
                    "Content-Type": "multipart/form-data",
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
            <form onSubmit={onFormSubmit} className="posting-application__form">
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

                <FormInput
                    label="Upload Resume"
                    type="file"
                    accept="application/pdf"
                    required
                    onChange={handleFileChange}
                />

                <Button variation="primary">Apply!</Button>
            </form>
        </div>
    );
}
