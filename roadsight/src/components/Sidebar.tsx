import { useState, useEffect } from "react";
import type { RoadSegment } from "../data/roads";

export default function Sidebar({
                                    selected,
                                }: {
    selected: RoadSegment | null;
}) {
    const [notes, setNotes] = useState("");

    useEffect(() => {
        setNotes("");
    }, [selected?.id]);

    return (
        <div className="sidebar">
            <h2>Inspection Details</h2>

            {selected ? (
                <>
                    <div className="detail-row">
                        <span className="label">Road</span>
                        <span>{selected.roadName}</span>
                    </div>

                    <div className="detail-row">
                        <span className="label">Segment ID</span>
                        <span>{selected.id}</span>
                    </div>

                    <div className="detail-row">
                        <span className="label">Condition</span>
                        <span className={selected.condition.toLowerCase()}>
              {selected.condition}
            </span>
                    </div>

                    <div className="detail-row">
                        <span className="label">Geometry Points</span>
                        <span>{selected.coordinates.length}</span>
                    </div>

                    <label className="notes-label">Inspector Notes</label>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add inspection notes..."
                        rows={6}
                    />

                    <div className="sidebar-actions">
                        <button>Mark for Review</button>
                        <button>Inspection Complete</button>
                    </div>
                </>
            ) : (
                <p>Select a road segment to inspect.</p>
            )}
        </div>
    );
}