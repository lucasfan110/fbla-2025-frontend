import Resource from "./Resource";
import Status from "./Status";

interface Posting {
    _id: string;
    name: string;
    image?: string;
    description?: string;
    location?: string;
    employer: string;
    schools: string[];
    resources?: Resource[];
    tags?: string[];
    applications: string[];
    status: Status;
    applicationCount: number;
    createdAt: string;
    hourlySalary?: number;
    coordinates: {
        latitude: number;
        longitude: number;
    };
}

export function postingsAreEqual(
    postingArr1: Posting[],
    postingArr2: Posting[]
): boolean {
    return postingArr1.every(
        (value, index) => value._id === postingArr2[index]._id
    );
}

export default Posting;
