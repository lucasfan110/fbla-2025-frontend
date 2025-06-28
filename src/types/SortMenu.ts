export type SortBy =
    | "recentlyCreated"
    | "companyName"
    | "hourlySalary"
    | "distance";
export type Direction = "ascending" | "descending";

const SORT_MENU_LOCAL_STORAGE_KEY = "sortMenu";

export type SortMenuType = {
    sortBy: SortBy;
    direction: Direction;
};

export const SORT_MENU_DEFAULT: SortMenuType = {
    sortBy: "recentlyCreated",
    direction: "ascending",
};

export const SORT_BY_VALUES: { value: SortBy; display: string }[] = [
    {
        value: "recentlyCreated",
        display: "Recently created",
    },
    {
        value: "companyName",
        display: "Company name",
    },
    {
        value: "hourlySalary",
        display: "Hourly Salary",
    },
    {
        value: "distance",
        display: "Distance",
    },
];

export const DIRECTION_VALUES: { value: Direction; display: string }[] = [
    {
        value: "ascending",
        display: "Ascending",
    },
    {
        value: "descending",
        display: "Descending",
    },
];

export function saveSortMenuValue(sortMenuValue: SortMenuType) {
    localStorage.setItem(
        SORT_MENU_LOCAL_STORAGE_KEY,
        JSON.stringify(sortMenuValue)
    );
}

export function readSortMenuValue(): SortMenuType | null {
    const value = localStorage.getItem(SORT_MENU_LOCAL_STORAGE_KEY);

    if (!value) {
        return null;
    }

    const sortMenuValue = JSON.parse(value);
    return sortMenuValue;
}
