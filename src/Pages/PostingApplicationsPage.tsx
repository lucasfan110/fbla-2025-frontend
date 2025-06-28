import { useContext, useEffect, useState } from "react";
import pdfToText from "react-pdftotext";
import { useParams } from "react-router-dom";
import backend from "../api/backend";
import PostingApplicationCard, {
    AIResult,
} from "../components/PostingApplicationCard";
import { UserAuthFormContext } from "../contexts/UserAuthFormContext";
import { useAuthVerified } from "../hooks/useAuth";
import usePostingApplications from "../hooks/usePostingApplications";
import Posting from "../types/Posting";
import getAuthToken from "../utils/getAuthToken";
import "./PostingApplicationsPage.scss";

export default function PostingApplicationsPage() {
    const { postingId = "" } = useParams();
    const [applications, setApplications] = usePostingApplications(postingId, {
        status: "pending",
    });
    const [aiRankResults, setAiRankResults] = useState<AIResult[] | null>(null);
    const {
        state: { aiRankingState },
        finishedRanking,
    } = useContext(UserAuthFormContext);
    const { user } = useAuthVerified();

    useEffect(() => {
        if (!applications.length) {
            return;
        }

        if (aiRankingState === "ranking") {
            (async () => {
                const applicants = await Promise.all(
                    applications.map(async app => {
                        const fileUrl = `${backend.getUri()}/applications/${
                            app._id
                        }/resume`;
                        const resume = await fetch(fileUrl);

                        return {
                            ...app,
                            resumeFile: undefined,
                            resume: await pdfToText(await resume.blob()),
                        };
                    })
                );

                const posting: Posting = (
                    await backend.get(
                        `/users/${user._id}/postings/${postingId}`,
                        {
                            headers: {
                                Authorization: getAuthToken(),
                            },
                        }
                    )
                ).data;

                const response = await backend.post("/ai/rank-applicants", {
                    applicants,
                    jobDescription: posting.description,
                });

                const rankedApplicants: AIResult[] =
                    response.data.data.rankedApplicants;
                setAiRankResults(rankedApplicants);

                const sortedApplications = [];

                for (const applicant of rankedApplicants) {
                    const application = applications.find(
                        app => app._id === applicant.applicantId
                    );

                    if (!application) {
                        continue;
                    }

                    sortedApplications.push(application);
                }

                setApplications(sortedApplications);
                finishedRanking();
            })();
        }
    }, [
        applications,
        aiRankingState,
        user._id,
        postingId,
        finishedRanking,
        setApplications,
    ]);

    return (
        <div className="posting-applications-page">
            {applications.length === 0 && (
                <div className="u-gray-text">
                    There are no pending applications for this posting!
                </div>
            )}

            {applications.map((application, index) => (
                <PostingApplicationCard
                    application={application}
                    aiResult={aiRankResults?.[index]}
                    key={application._id}
                />
            ))}
        </div>
    );
}
