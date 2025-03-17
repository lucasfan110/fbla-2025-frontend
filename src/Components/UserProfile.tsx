import { useEffect, useRef, useState } from "react";
import "./UserProfile.scss";
import UserProfileDropdown from "./UserProfileDropdown";
import User from "../types/User";

function getUserInitials(user: User): string {
    return user.firstName.charAt(0) + user.lastName.charAt(0);
}

interface Props {
    user: User;
}

export default function UserProfile({ user }: Props) {
    const [dropdownDisplay, setDropdownDisplay] = useState<"none" | "flex">(
        "none"
    );
    const [isClickedOpen, setIsClickedOpen] = useState(false);
    const profilePictureDiv = useRef<HTMLDivElement>(null);
    const dropdownComponent = useRef<HTMLDivElement>(null);

    function handlePFPMouseOver() {
        if (!isClickedOpen) {
            setDropdownDisplay("flex");
        }
    }

    function handlePFPMouseOut() {
        if (!isClickedOpen) {
            setDropdownDisplay("none");
        }
    }

    // When user clicks outside of profile picture or dropdown when dropdown is opened
    useEffect(() => {
        function handleDocumentClick(event: MouseEvent) {
            if (!(event.target instanceof Element)) {
                return;
            }

            const target = event.target as Element;

            if (
                !profilePictureDiv.current?.contains(target) &&
                !dropdownComponent.current?.contains(target)
            ) {
                setIsClickedOpen(false);
                setDropdownDisplay("none");
            }

            if (target.classList.contains("user-profile-dropdown__link")) {
                setIsClickedOpen(false);
                setDropdownDisplay("none");
            }
        }

        document.addEventListener("click", handleDocumentClick);

        return () => {
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);

    return (
        <div className="user-profile">
            <div
                className="user-profile__profile-picture"
                onMouseOver={handlePFPMouseOver}
                onMouseOut={handlePFPMouseOut}
                onMouseDown={() => setIsClickedOpen(true)}
                ref={profilePictureDiv}
            >
                {getUserInitials(user)}
            </div>
            <UserProfileDropdown
                user={user}
                onMouseOver={handlePFPMouseOver}
                onMouseOut={handlePFPMouseOut}
                style={{ display: dropdownDisplay }}
                ref={dropdownComponent}
            />
        </div>
    );
}
