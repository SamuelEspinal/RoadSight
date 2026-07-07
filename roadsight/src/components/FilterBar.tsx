interface FilterBarProps {
    filters: {
        good: boolean;
        fair: boolean;
        poor: boolean;
    };
    setFilters: React.Dispatch<
        React.SetStateAction<{
            good: boolean;
            fair: boolean;
            poor: boolean;
        }>
    >;
}

export default function FilterBar({
    filters,
    setFilters,
}: FilterBarProps) {
    const toggle = (key: keyof typeof filters) => {
        setFilters((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };
    return (
        <div className="filter-bar">
            <button
                className={filters.good ? "active good" : ""}
                onClick={() => toggle("good")}
            >
                🟢 Good
            </button>

            <button
                className={filters.fair ? "active fair" : ""}
                onClick={() => toggle("fair")}
            >
                🟡 Fair
            </button>

            <button
                className={filters.poor ? "active poor" : ""}
                onClick={() => toggle("poor")}
            >
                🔴 Poor
            </button>
        </div>
    );
}