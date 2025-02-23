import classNames from "classnames";
import sanitizeHTML from "sanitize-html";
import "./Tags.scss";

interface Props extends React.ComponentPropsWithRef<"span"> {
    tags?: string[];
    extraTagContentRender?: (tag: string) => React.ReactNode;
    compacted?: boolean;
}

export default function Tags({
    tags,
    extraTagContentRender,
    className,
    compacted = false,
    ...props
}: Props) {
    function renderTags() {
        return tags?.map(tag => {
            return (
                <span
                    key={tag}
                    className={classNames("tags__tag", {
                        "tags__tag--compacted": compacted,
                    })}
                >
                    <span
                        dangerouslySetInnerHTML={{ __html: sanitizeHTML(tag) }}
                    />
                    {extraTagContentRender?.(tag)}
                </span>
            );
        });
    }

    return (
        <span
            className={classNames("tags", className, {
                "tags--compacted": compacted,
            })}
            {...props}
        >
            {renderTags()}
        </span>
    );
}
