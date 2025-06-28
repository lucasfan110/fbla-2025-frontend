import Input from "./Input";
import "./SearchInput.scss";

interface Props extends React.ComponentPropsWithoutRef<"input"> {
    onSearchInputSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function SearchInput({ onSearchInputSubmit, ...props }: Props) {
    return (
        <form
            className="search-input__container"
            onSubmit={onSearchInputSubmit}
        >
            <i className="bi bi-search" />
            <Input
                className="search-input__input"
                placeholder="Search for postings..."
                {...props}
            />
        </form>
    );
}
