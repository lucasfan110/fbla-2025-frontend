import classNames from "classnames";
import Status from "../types/Status";
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
