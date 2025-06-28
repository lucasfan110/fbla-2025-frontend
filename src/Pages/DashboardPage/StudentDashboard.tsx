import { useEffect, useRef, useState } from "react";
import backend from "../../api/backend";
import PostingCardList from "../../components/PostingCardList";
import SearchInput from "../../components/SearchInput";
import { useAuthWithSchool } from "../../hooks/useAuth";
import Posting, { postingsAreEqual } from "../../types/Posting";
import getAuthToken from "../../utils/getAuthToken";
import { highlightMatchedParts, search } from "../../utils/searchHelper";
import "./StudentDashboard.scss";
import SortMenu from "../../components/SortMenu";
import {
    readSortMenuValue,
    saveSortMenuValue,
    SORT_MENU_DEFAULT,
    SortMenuType,
} from "../../types/SortMenu";
import useUserLocation from "../../hooks/useUserLocation";
import { getDistance } from "geolib";

export default function StudentDashboard() {
    const allPostings = useRef<Posting[]>([]);
    const [displayedPostings, setDisplayedPostings] = useState<Posting[]>([]);
    const [query, setQuery] = useState("");
    const { user, school } = useAuthWithSchool();
    const [sortMenuValue, setSortMenuValue] = useState<SortMenuType>(
        readSortMenuValue() ?? SORT_MENU_DEFAULT
    );
    const { userCoords, error } = useUserLocation();

    useEffect(() => {
        (async () => {
            const res = await backend.get(`/users/${user._id}/postings`, {
                params: {
                    schools: user.school,
                    status: "approved",
                },
                headers: {
                    Authorization: getAuthToken(),
                },
            });

            const postings = res.data.data.postings;

            allPostings.current = res.data.data.postings;
            setDisplayedPostings(postings);
        })();
    }, [user]);

    useEffect(() => {
        if (!query) {
            setDisplayedPostings(allPostings.current);
        }
    }, [query]);

    useEffect(() => {
        const displayedPostingsClone = [...displayedPostings];

        switch (sortMenuValue.sortBy) {
            case "recentlyCreated": {
                if (sortMenuValue.direction === "ascending") {
                    displayedPostingsClone.sort(
                        (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime()
                    );
                } else {
                    displayedPostingsClone.sort(
                        (a, b) =>
                            new Date(a.createdAt).getTime() -
                            new Date(b.createdAt).getTime()
                    );
                }
                break;
            }
            case "companyName": {
                if (sortMenuValue.direction === "ascending") {
                    displayedPostingsClone.sort((a, b) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                    );
                } else {
                    displayedPostingsClone.sort((a, b) =>
                        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                    );
                }
                break;
            }
            case "hourlySalary": {
                // const unpaidPostings: Posting[] = [];
                // const paidPostings: Posting[] = [];

                // for (const posting of displayedPostingsClone) {
                //     if (!posting.hourlySalary) {
                //         unpaidPostings.push(posting);
                //     } else {
                //         paidPostings.push(posting);
                //     }
                // }
                // displayedPostingsClone = [...paidPostings, ...unpaidPostings];

                if (sortMenuValue.direction === "ascending") {
                    displayedPostings.sort(
                        (a, b) => (a.hourlySalary ?? 0) - (b.hourlySalary ?? 0)
                    );
                } else {
                    displayedPostings.sort(
                        (a, b) => (b.hourlySalary ?? 0) - (a.hourlySalary ?? 0)
                    );
                }

                break;
            }
            case "distance": {
                if (!userCoords) {
                    return;
                }

                if (error) {
                    alert(
                        "Cannot sort by distance! Make sure location permission is allowed!"
                    );
                    return;
                }

                if (sortMenuValue.direction === "ascending") {
                    displayedPostingsClone.sort(
                        (a, b) =>
                            getDistance(userCoords, a.coordinates) -
                            getDistance(userCoords, b.coordinates)
                    );
                } else {
                    displayedPostingsClone.sort(
                        (a, b) =>
                            getDistance(userCoords, b.coordinates) -
                            getDistance(userCoords, a.coordinates)
                    );
                }

                break;
            }
        }

        if (postingsAreEqual(displayedPostingsClone, displayedPostings)) {
            return;
        }

        setDisplayedPostings(displayedPostingsClone);
        saveSortMenuValue(sortMenuValue);
    }, [sortMenuValue, displayedPostings, error, userCoords]);

    async function onSearchInputSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!query) {
            return;
        }

        const trimmedQuery = query.trim();

        const queriedPostings = await search(user._id, trimmedQuery, {
            schools: user.school,
            status: "approved",
        });
        const postingsToRender = highlightMatchedParts(
            queriedPostings,
            trimmedQuery
        );

        setDisplayedPostings(postingsToRender);
    }

    return (
        <div className="student-dashboard">
            <h1 className="u-text-center">Student Dashboard</h1>
            <h3 className="u-text-center u-gray-text">{school?.name}</h3>

            <div className="student-dashboard__heading">
                <h2>Postings to Apply For</h2>
            </div>

            <div className="student-dashboard__search-input-container">
                <SearchInput
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                    onSearchInputSubmit={onSearchInputSubmit}
                />
                <SortMenu
                    sortMenuValue={sortMenuValue}
                    setSortMenuValue={setSortMenuValue}
                />
            </div>

            {(() => {
                if (allPostings.current.length === 0) {
                    return (
                        <p className="u-gray-text">
                            There are no postings available to apply in your
                            school! Wait for an employer to post a job posting!
                        </p>
                    );
                } else if (displayedPostings.length === 0) {
                    return <p className="u-gray-text">No posting found!</p>;
                }
            })()}

            <PostingCardList
                postingsList={displayedPostings}
                showStatus={false}
                readOnly
            />
        </div>
    );
}
