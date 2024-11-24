import classNames from "classnames";
import "./Button.scss";

type ButtonType = "primary";

interface Props extends React.ComponentPropsWithoutRef<"button"> {
    variation?: ButtonType;
}

export default function Button({ className, variation, ...props }: Props) {
    return (
        <button
            className={classNames(
                "button",
                { [`button--${variation}`]: variation },
                className
            )}
            {...props}
        />
    );
}
