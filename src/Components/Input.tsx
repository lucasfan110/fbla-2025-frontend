import classNames from "classnames";
import "./Input.scss";

export default function Input({
    className,
    ...props
}: React.ComponentProps<"input">) {
    return <input className={classNames("input", className)} {...props} />;
}
