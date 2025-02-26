import { useEffect, useState } from "react";
import backend from "../api/backend";
import { Resource } from "../types/Resource";

export interface School {
    _id: string;
    name: string;
    image: string;
    description: string;
    location: string;
    phoneNumber: string;
    email: string;
    resources: Resource[];
}

export function schoolsToOptions(schools: School[]) {
    return schools.map(school => ({
        label: school.name,
        value: school._id,
    }));
}

export default function useSchools() {
    const [allSchools, setAllSchools] = useState<School[]>([]);

    useEffect(() => {
        (async () => {
            const schools = await backend.get("/schools", {
                params: { fields: "name" },
            });

            setAllSchools(schools.data.data.schools);
        })();
    }, []);

    return allSchools;
}
