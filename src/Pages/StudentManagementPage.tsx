import StudentCard from "../components/StudentCard";
import useStudentsFromAdmin from "../hooks/useStudentsFromAdmin";
import "./StudentManagementPage.scss";

export default function StudentManagementPage() {
    const { students } = useStudentsFromAdmin();

    return (
        <div className="student-management-page">
            <h2>Student Management</h2>

            <div className="student-management-page__student-list">
                {students.map(student => (
                    <StudentCard student={student} key={student._id} />
                ))}
            </div>
        </div>
    );
}
