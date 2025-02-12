import "./Dropdown.scss";

export interface Option {
    value: string;
    label: string;
}

interface Props {
    label?: string;
    options?: Option[];
    value?: string;
    onChange?: (value: string) => void;
}

export default function Dropdown({
    label,
    options = [],
    value,
    onChange,
}: Props) {
    function handleSelectChange(event: React.ChangeEvent<HTMLSelectElement>) {
        onChange?.(event.target.value);
    }

    return (
        <div className="dropdown">
            <label htmlFor="dropdown" className="dropdown__label">
                {label}
            </label>
            <select
                id="dropdown"
                value={value}
                onChange={handleSelectChange}
                className="dropdown__select"
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}
