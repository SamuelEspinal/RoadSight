import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { type RoadSegment } from "../data/roads";
import { buildRoadGeoJSON } from "../utils/geojson.ts";
import { updateRoadHighlight, zoomToRoad} from "../utils/mapUtils.ts";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

interface Props {
    roads: RoadSegment[];
    selectedRoad: RoadSegment | null;
    onSelect: (road: RoadSegment | null) => void;
};


export default function MapView({
    roads,
    selectedRoad,
    onSelect,
}: Props) {
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<mapboxgl.Map | null>(null);
    console.log("Road count:", roads.length);

    useEffect(() => {
        if (!mapContainer.current || mapRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainer.current,
            style: "mapbox://styles/mapbox/streets-v12",
            center: [-81.3792, 28.5383],
            zoom: 10,
        });

        mapRef.current = map;

        map.addControl(new mapboxgl.NavigationControl(), "top-right");

        map.on("load", () => {
            map.addSource("roads", {
                type: "geojson",
                data: buildRoadGeoJSON(roads),
            });

            // BASE LAYER
            map.addLayer({
                id: "roads-layer",
                type: "line",
                source: "roads",
                paint: {
                    "line-width": 6,
                    "line-color": [
                        "match",
                        ["get", "condition"],
                        "Good",
                        "#22c55e",
                        "Fair",
                        "#f59e0b",
                        "Poor",
                        "#ef4444",
                        "#64748b",
                    ],
                },
            });

            // HIGHLIGHT LAYER
            map.addLayer({
                id: "roads-highlight",
                type: "line",
                source: "roads",
                paint: {
                    "line-width": 10,
                    "line-color": "#ffffff",
                    "line-opacity": 0.8,
                },
                filter: ["==", "id", ""],
            });

            // CLICK HANDLER
            map.on("click", "roads-layer", (e) => {
                const feature = e.features?.[0];
                const id = feature?.properties?.id;

                if (!id) return;

                const road = roads.find((r) => r.id === id);

                onSelect(road ?? null);
            });

            map.on("click", (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ["roads-layer"],
                });

                if (features.length === 0) {
                    onSelect(null);
                }
            });

            // UX polish
            map.on("mouseenter", "roads-layer", () => {
                map.getCanvas().style.cursor = "pointer";
            });

            map.on("mouseleave", "roads-layer", () => {
                map.getCanvas().style.cursor = "";
            });
        });

        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        const source = map.getSource("roads") as mapboxgl.GeoJSONSource | undefined;
        if (!source) return;

        source.setData(buildRoadGeoJSON(roads))

    }, [roads]);

    useEffect(() => {
        const map = mapRef.current;
        if (!map) return;

        updateRoadHighlight(map, selectedRoad);
        zoomToRoad(map, selectedRoad);
    }, [selectedRoad]);

    return <div ref={mapContainer} className="map-container" />;
}