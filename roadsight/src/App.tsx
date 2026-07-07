import "./App.css";
import {useEffect, useState} from "react";
import {type RoadSegment, roadSegments} from "./data/roads.ts";
import MapView from "./components/MapView";
import Sidebar from "./components/Sidebar.tsx";
import StatsBar from "./components/StatsBar.tsx";
import FilterBar from "./components/FilterBar";

function App() {
    const [roads] = useState<RoadSegment[]>(roadSegments);
    const [selected, setSelected] = useState<RoadSegment | null>(null);

    const [filters, setFilters] = useState({
        good: true,
        fair: true,
        poor: true,
    });

    const filteredRoads = roads.filter((road) => {
        if (road.condition === "Good" && filters.good) return true;
        if (road.condition === "Fair" && filters.fair) return true;
        if (road.condition === "Poor" && filters.poor) return true;

        return false;
    });

    useEffect(() => {
        if (!selected) return;

        const stillVisible = filteredRoads.some(
            (road) => road.id === selected.id
        );

        if (!stillVisible) {
            setSelected(null);
        }
    }, [filteredRoads, selected]);


  return (
      <><>
          <header className="header">
              <h1>RoadSight</h1>
          </header>

          <FilterBar
              filters={filters}
              setFilters={setFilters}
          />

          <StatsBar
              roads={filteredRoads}
              selectedRoad={selected}
          />

          <div className="layout">
              <MapView
                  roads={filteredRoads}
                  selectedRoad={selected}
                  onSelect={setSelected}
              />
              <Sidebar selected={selected}/>
          </div>
      </>
      </>
  );
}

export default App;