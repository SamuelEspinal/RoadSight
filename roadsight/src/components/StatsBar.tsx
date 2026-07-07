import type { RoadSegment } from "../data/roads";

interface StatsBarProps {
    roads: RoadSegment[];
    selectedRoad: RoadSegment | null;
}

export default function StatsBar({
    roads,
    selectedRoad,
}: StatsBarProps) {
    const good = roads.filter(r => r.condition === "Good").length;
    const fair = roads.filter(r => r.condition === "Fair").length;
    const poor = roads.filter(r => r.condition === "Poor").length;

    return (
        <div className="stats-bar">
            <div className="stat good">
                🟢 <strong>{good}</strong> Good
            </div>

            <div className="stat fair">
                🟡 <strong>{fair}</strong> Fair
            </div>

            <div className="stat poor">
                🔴 <strong>{poor}</strong> Poor
            </div>

            <div className="stat selected">
                📍{" "}
                {selectedRoad
                    ? selectedRoad.roadName
                    : "No Selection"}
            </div>
        </div>
    );
}