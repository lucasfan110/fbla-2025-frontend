import classNames from "classnames";
import Button, { ButtonProps } from "../components/Button";
import "./NotificationButton.scss";

interface Props extends ButtonProps {
    notificationCount: number;
}

export default function NotificationButton({
    notificationCount,
    ...props
}: Props) {
    return (
        <Button
            {...props}
            className={classNames("notification-button", props.className)}
        >
            {props.children}
            {notificationCount > 0 && (
                <span className="notification-button__notification-count">
                    {notificationCount}
                </span>
            )}
        </Button>
    );
}
