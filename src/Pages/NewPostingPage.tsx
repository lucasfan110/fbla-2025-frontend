import PostingForm from "../components/PostingForm";
import { useAuthVerified } from "../hooks/useAuth";
import * as PostingHelper from "../utils/postingsHelper";
import "./NewPostingPage.scss";

export default function NewPostingPage() {
    const { user } = useAuthVerified();

    async function onFormSubmit(formData: PostingHelper.FormData) {
        const res = await PostingHelper.createPosting(user._id, formData);

        if (res.data.status === "success") {
            window.location.reload();
        } else {
            alert("Failed to create posting!");
        }
    }

    return (
        <div className="new-posting-page">
            <h2 className="new-posting-page__title">New Job Posting</h2>

            <PostingForm onFormSubmit={onFormSubmit} />
        </div>
    );
}
