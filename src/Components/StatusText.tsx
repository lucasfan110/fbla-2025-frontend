import classNames from "classnames";
import { Status } from "../types/Posting";
import "./StatusText.scss";

interface Props {
    status: Status;
}

export default function StatusText({ status }: Props) {
    return (
        <span className={classNames("status-text", `status-text--${status}`)}>
            {status}
        </span>
    );
}
