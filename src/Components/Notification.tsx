import classNames from "classnames";
import "./Notification.scss";

interface Props extends React.ComponentPropsWithoutRef<"span"> {
    notificationCount: number;
}

export default function Notification({ notificationCount, ...props }: Props) {
    if (notificationCount === 0) {
        return null;
    }

    return (
        <span
            {...props}
            className={classNames("notification", props.className)}
        >
            {notificationCount}
        </span>
    );
}
