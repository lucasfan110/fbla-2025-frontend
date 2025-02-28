import Status from "../types/Status";
import "./AcceptOrReject.scss";
import Button from "./Button";

interface Props {
    onClick?: (status: Status) => void;
}

export default function AcceptOrReject({ onClick }: Props) {
    return (
        <div className="accept-or-reject">
            <Button variation="safe" onClick={() => onClick?.("approved")}>
                Accept
            </Button>
            <Button variation="danger" onClick={() => onClick?.("rejected")}>
                Reject
            </Button>
        </div>
    );
}
