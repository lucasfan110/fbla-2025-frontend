import classNames from "classnames";
import "./Section.scss";

export default function Section(
    props: React.ComponentPropsWithoutRef<"section">
) {
    return (
        <section
            {...props}
            className={classNames("section", props.className)}
        />
    );
}
