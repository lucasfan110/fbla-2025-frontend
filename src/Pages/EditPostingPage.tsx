import PostingForm from "../components/PostingForm";
import { useAuthVerified } from "../hooks/useAuth";
import Posting from "../types/Posting";
import * as PostingHelper from "../utils/postingsHelper";
import "./EditPostingPage.scss";

interface Props {
    posting: Posting | null;
}

export default function EditPostingPage({ posting }: Props) {
    const { user } = useAuthVerified();

    let initialFormData: PostingHelper.FormData | undefined = undefined;

    if (posting) {
        // Manually picking the fields so other unnecessary fields don't get put
        // in the FormData object
        initialFormData = {
            name: posting.name,
            schools: posting.schools,
            description: posting.description,
            image: posting.image,
            location: posting.location,
            resources: posting.resources,
            tags: posting.tags,
            hourlySalary: posting.hourlySalary,
        };
    }

    return (
        <div className="edit-posting-page">
            <h2 className="edit-posting-page__title">Edit Job Posting</h2>

            <PostingForm
                initialFormData={initialFormData}
                onFormSubmit={async data => {
                    await PostingHelper.editPosting(
                        user._id,
                        posting?._id ?? "",
                        data
                    );

                    window.location.reload();
                }}
                submitButtonLabel="Edit Posting"
            />
        </div>
    );
}
