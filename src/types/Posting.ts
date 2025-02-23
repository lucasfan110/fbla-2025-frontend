import { Resource } from "./Resource";

export interface Posting {
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
}
