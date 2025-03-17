import { forwardRef } from "react";
import { Link } from "react-router-dom";
import User from "../types/User";
import "./UserProfileDropdown.scss";

interface Props extends React.ComponentPropsWithoutRef<"div"> {
    user: User;
}

const UserProfileDropdown = forwardRef<HTMLDivElement, Props>(
    ({ user, ...props }: Props, ref) => {
        return (
            <div className="user-profile-dropdown" ref={ref} {...props}>
                <h3 className="user-profile-dropdown__username">
                    {user.firstName} {user.lastName}
                </h3>

                <div className="user-profile-dropdown__icon-link">
                    <i className="bi bi-person user-profile-dropdown__icon" />
                    <Link className="user-profile-dropdown__link" to="/profile">
                        Profile
                    </Link>
                </div>

                {user.role === "student" && (
                    <div className="user-profile-dropdown__icon-link">
                        <i className="bi bi-window user-profile-dropdown__icon" />
                        <Link
                            className="user-profile-dropdown__link"
                            to="/my-applications"
                        >
                            My Applications
                        </Link>
                    </div>
                )}

                <div className="user-profile-dropdown__icon-link">
                    <i className="bi bi-box-arrow-right user-profile-dropdown__icon" />
                    <Link to="/log-out" className="user-profile-dropdown__link">
                        Log out
                    </Link>
                </div>
            </div>
        );
    }
);

export default UserProfileDropdown;
