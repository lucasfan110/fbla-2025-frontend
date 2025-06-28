import {
    Direction,
    DIRECTION_VALUES,
    SORT_BY_VALUES,
    SortBy,
    SortMenuType,
} from "../types/SortMenu";
import "./SortMenu.scss";

interface Props {
    // sortBy: SortBy;
    // direction: Direction;
    sortMenuValue: SortMenuType;
    setSortMenuValue: React.Dispatch<React.SetStateAction<SortMenuType>>;
}

export default function SortMenu({ sortMenuValue, setSortMenuValue }: Props) {
    return (
        <div className="sort-menu">
            <div className="sort-menu__sort-by">
                <p>
                    <i className="bi bi-funnel sort-menu__icon" />
                    Sort by
                </p>
                <select
                    onChange={e =>
                        setSortMenuValue(value => ({
                            ...value,
                            sortBy: e.target.value as SortBy,
                        }))
                    }
                    value={sortMenuValue.sortBy}
                    className="sort-menu__select"
                >
                    {SORT_BY_VALUES.map(({ value, display }, index) => {
                        return (
                            <option value={value} key={index}>
                                {display}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="sort-menu__direction">
                <p>
                    <i className="bi bi-arrow-down-up sort-menu__icon" />
                    Direction
                </p>
                <select
                    onChange={e =>
                        setSortMenuValue(value => ({
                            ...value,
                            direction: e.target.value as Direction,
                        }))
                    }
                    value={sortMenuValue.direction}
                    className="sort-menu__select"
                >
                    {DIRECTION_VALUES.map(({ value, display }, index) => {
                        return (
                            <option value={value} key={index}>
                                {display}
                            </option>
                        );
                    })}
                </select>
            </div>
        </div>
    );
}
