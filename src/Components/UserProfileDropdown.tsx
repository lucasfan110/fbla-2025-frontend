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

                {/* <Link
                    className="user-profile-dropdown__icon-link"
                    to="/profile"
                >
                    <i className="bi bi-person user-profile-dropdown__icon" />
                    <p className="user-profile-dropdown__link">Profile</p>
                </Link> */}

                {user.role === "student" && (
                    <Link
                        className="user-profile-dropdown__icon-link"
                        to="/my-applications"
                    >
                        <i className="bi bi-window user-profile-dropdown__icon" />
                        <p className="user-profile-dropdown__link">
                            My Applications
                        </p>
                    </Link>
                )}

                {user.role === "admin" && (
                    <Link
                        className="user-profile-dropdown__icon-link"
                        to="/admin/student-management"
                    >
                        <i className="bi bi-people user-profile-dropdown__icon" />
                        <p className="user-profile-dropdown__link user-profile-dropdown__student-management-link">
                            Student Management
                        </p>
                    </Link>
                )}

                <Link
                    className="user-profile-dropdown__icon-link"
                    to="/log-out"
                >
                    <i className="bi bi-box-arrow-right user-profile-dropdown__icon" />
                    <p className="user-profile-dropdown__link">Log out</p>
                </Link>
            </div>
        );
    }
);

export default UserProfileDropdown;
