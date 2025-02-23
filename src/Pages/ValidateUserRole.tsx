import { Navigate, Outlet } from "react-router-dom";
import { UserRole } from "../types/User";
import useAuth from "../hooks/useAuth";

interface Props {
    userRole: UserRole;
    children?: React.ReactNode;
}

export default function ValidateUserRole({ children, userRole }: Props) {
    const { user } = useAuth();

    if (!user || user.role !== userRole) {
        return <Navigate to="/" replace />;
    }

    return children ?? <Outlet />;
}
