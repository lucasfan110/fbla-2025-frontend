import classNames from "classnames";
import "./TextArea.scss";

export default function TextArea({
    className,
    ...props
}: React.ComponentProps<"textarea">) {
    return (
        <textarea
            className={classNames("text-area", className)}
            rows={5}
            {...props}
        />
    );
}
