import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { heatmapLayer } from './map-style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoieHRyYXBvd2VyIiwiYSI6ImNrNXBsMzJ4azB0b3czbm1vbmQ2YmdrZmMifQ.tOmZu41N2WGmpOUA06y8og'; // Set your mapbox token here

/* eslint-disable */

const DEVICE_MAP_QUERY = gql`
  query DeviceMapQuery {
    allIpAddressLocations(condition: {}) {
      edges {
        node {
          ipAddress
          latitude
          longitude
        }
      }
    }
  }
`;

function DeviceWorldMap() {
  const [viewport, setViewport] = React.useState({
    latitude: 51,
    longitude: 0,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  const { data, loading, error } = useQuery(DEVICE_MAP_QUERY, {});

  const onViewportChange = viewportNew => setViewport(viewportNew);

  if (loading) return <CircularProgress />;

  if (error) {
    return <p id="error">Error :(</p>;
  }

  const vals = data.allIpAddressLocations.edges.map(arr => {
    const x = arr.node;
    return {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [x.longitude, x.latitude],
      },
      properties: {
        name: x.ipAddress,
      },
    };
  });

  const geoJson = {
    type: 'FeatureCollection',
    features: vals,
  };

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      mapStyle="mapbox://styles/mapbox/dark-v9"
      onViewportChange={onViewportChange}
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      {data && (
        <Source type="geojson" data={geoJson}>
          <Layer {...heatmapLayer} />
        </Source>
      )}
    </ReactMapGL>
  );
}

export default DeviceWorldMap;
