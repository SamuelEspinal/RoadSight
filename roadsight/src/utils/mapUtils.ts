import mapboxgl from "mapbox-gl";
import type { RoadSegment } from "../data/roads";

export function updateRoadHighlight(
    map: mapboxgl.Map,
    road: RoadSegment | null
) {
    if (!map.isStyleLoaded()) return;

    if (!map.getLayer("roads-highlight")) return;

    map.setFilter("roads-highlight", [
        "==",
        "id",
        road?.id ?? "",
    ]);
}

export function zoomToRoad(
    map: mapboxgl.Map,
    road: RoadSegment | null
) {
    if (!road || road.coordinates.length === 0) return;

    const bounds = new mapboxgl.LngLatBounds(
        road.coordinates[0],
        road.coordinates[0]
    );

    for (const coord of road.coordinates) {
        bounds.extend(coord);
    }

    map.fitBounds(bounds, {
        padding: 120,
        duration: 1800,
        essential: true,
    });
}