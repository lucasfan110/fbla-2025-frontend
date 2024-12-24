import classNames from "classnames";
import "./SeparatorWithElement.scss";

interface Props {
    children?: React.ReactNode;
    className?: string;
}

export default function SeparatorWithElement({ children, className }: Props) {
    return (
        <div className={classNames("separator-with-element", className)}>
            <div className="separator-with-element__line" />
            <div className="separator-with-element__element">{children}</div>
            <div className="separator-with-element__line" />
        </div>
    );
}
