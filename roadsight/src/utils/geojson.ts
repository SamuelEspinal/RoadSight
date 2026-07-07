import type { FeatureCollection, Feature, LineString } from "geojson";
import {type RoadSegment} from "../data/roads";

export function buildRoadGeoJSON(roads : RoadSegment[]): FeatureCollection<
    LineString,
    {
        id: string;
        roadName: string;
        condition: string;
    }
> {
    return {
        type: "FeatureCollection",
        features: roads.map(
            (segment): Feature<
                LineString,
                {
                    id: string;
                    roadName: string;
                    condition: string;
                }
            > => ({
                type: "Feature",
                properties: {
                    id: segment.id,
                    roadName: segment.roadName,
                    condition: segment.condition,
                },
                geometry: {
                    type: "LineString",
                    coordinates: segment.coordinates,
                },
            })
        ),
    };
}