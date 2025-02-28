import Status from "./Status";
import User from "./User";

export interface Application {
    _id: string;
    student: Omit<User, "school"> & { school: { name: string } };
    posting: {
        _id: string;
        name: string;
    };
    response: string;
    status: Status;
}
