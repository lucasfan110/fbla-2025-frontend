import backend from "../api/backend";
import "./ResumeDisplay.scss";

interface Props {
    applicationId: string;
    fileName: string;
}

export default function ResumeDisplay({ applicationId }: Props) {
    const fileUrl = `${backend.getUri()}/applications/${applicationId}/resume`;
    const googleViewer = `https://docs.google.com/gview?url=${fileUrl}&embedded=true`;

    console.log(googleViewer);

    return (
        <div className="resume-display">
            <iframe
                src={googleViewer}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "none",
                }}
                title="Document Preview"
                className="resume"
            />
        </div>
    );
}
