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
}

export default Posting;
