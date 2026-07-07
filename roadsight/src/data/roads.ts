export type RoadCondition = "Good" | "Fair" | "Poor";

export interface RoadSegment {
    id: string;
    roadName: string;
    condition: RoadCondition;
    coordinates: [number, number][];
}

export const roadSegments: RoadSegment[] = [
    {
        id: "i4-1",
        roadName: "I-4 East",
        condition: "Good",
        coordinates: [
            [-81.470, 28.500],
            [-81.420, 28.510],
        ],
    },
    {
        id: "i4-2",
        roadName: "I-4 East",
        condition: "Fair",
        coordinates: [
            [-81.420, 28.510],
            [-81.360, 28.520],
        ],
    },
    {
        id: "i4-3",
        roadName: "I-4 East",
        condition: "Poor",
        coordinates: [
            [-81.360, 28.520],
            [-81.300, 28.530],
        ],
    },

    {
        id: "sr417-1",
        roadName: "SR-417",
        condition: "Good",
        coordinates: [
            [-81.450, 28.420],
            [-81.380, 28.450],
        ],
    },
    {
        id: "sr417-2",
        roadName: "SR-417",
        condition: "Fair",
        coordinates: [
            [-81.380, 28.450],
            [-81.310, 28.480],
        ],
    },
];