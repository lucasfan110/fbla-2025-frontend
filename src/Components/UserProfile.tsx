import User from "../types/User";

interface Props {
    user: User;
}

export default function UserProfile({ user }: Props) {
    return <div className="user-profile">{user.firstName}</div>;
}
