export type UserRole = "student" | "employer" | "admin";

export default interface User {
    _id: string;
    role: UserRole;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    /**
     * Only used when role === "student"
     */
    grade?: number;
    /**
     * Only used when role === "admin" | "student"
     */
    school?: string;
}
