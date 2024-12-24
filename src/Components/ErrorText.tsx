import "./ErrorText.scss";

interface Props {
    children?: React.ReactNode | null;
}

export default function ErrorText({ children }: Props) {
    if (!children) {
        return <></>;
    }

    return <div className="error-text">{children}</div>;
}
