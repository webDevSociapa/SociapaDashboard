'use client'

import { ComposableMap, Geographies, Geography } from 'react-simple-maps'

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export function TrafficMapping() {
  return (
    <div className="rounded-lg border bg-white p-4">
      <h3 className="mb-4 text-lg font-medium">Traffic Mapping by Country</h3>
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}

