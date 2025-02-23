import classNames from "classnames";
import { ChangeEventHandler, useState } from "react";
import "./FormInput.scss";
import TextArea from "./TextArea";

interface Validate {
    validator: (value: string) => boolean;
    invalidMessage: string;
}

export interface FormTextAreaProps extends React.ComponentProps<"textarea"> {
    label: string;
    validate?: Validate | Validate[];
}

export default function FormTextArea({
    label,
    className,
    onChange,
    validate,
    ...props
}: FormTextAreaProps) {
    const [changed, setChanged] = useState(false);

    const handleInputChange: ChangeEventHandler<
        HTMLTextAreaElement
    > = event => {
        setChanged(true);
        onChange?.(event);
    };

    function renderInvalidMessage() {
        if (!changed || !validate) {
            return null;
        }

        let validateAsArray: Validate[] = [];

        if (!Array.isArray(validate)) {
            validateAsArray = [validate];
        } else {
            validateAsArray = validate;
        }

        return validateAsArray.map(v => {
            if (!v.validator(props.value?.toString() ?? "")) {
                return (
                    <p
                        className="form-input__invalid-message"
                        key={v.invalidMessage}
                    >
                        {v.invalidMessage}
                    </p>
                );
            }

            return null;
        });
    }

    return (
        <div className={classNames("form-input", className)}>
            <label htmlFor={props.id} className="form-input__label">
                {label}
                {props.required && (
                    <span className="form-input__required">*</span>
                )}
            </label>
            <TextArea
                className="form-input__input"
                onChange={handleInputChange}
                {...props}
            />

            {renderInvalidMessage()}
        </div>
    );
}
