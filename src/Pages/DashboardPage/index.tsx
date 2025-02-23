import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import StudentDashboard from "./StudentDashboard";
import EmployerDashboard from "./EmployerDashboard";
import AdminDashboard from "./AdminDashboard";

export default function DashboardPage() {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" replace />;
    }

    switch (user.role) {
        case "student":
            return <StudentDashboard />;
        case "employer":
            return <EmployerDashboard />;
        case "admin":
            return <AdminDashboard></AdminDashboard>;
    }
}
