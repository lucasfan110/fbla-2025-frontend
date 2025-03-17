import classNames from "classnames";
import Button, { ButtonProps } from "../components/Button";
import "./NotificationButton.scss";
import Notification from "../components/Notification";

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
            <Notification
                notificationCount={notificationCount}
                className="notification-button__notification-count"
            />
        </Button>
    );
}
