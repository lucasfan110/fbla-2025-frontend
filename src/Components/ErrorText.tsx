import classNames from "classnames";
import "./ErrorText.scss";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    show?: boolean;
}

export default function ErrorText({
    children,
    className,
    show = true,
    ...props
}: Props) {
    if (!children || !show) {
        return <></>;
    }

    return (
        <div className={classNames("error-text", className)} {...props}>
            {children}
        </div>
    );
}
