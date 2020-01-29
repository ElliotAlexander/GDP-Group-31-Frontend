import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useQuery } from '@apollo/react-hooks';
import { heatmapLayer } from './map-style';

/* eslint-disable */

const MAPBOX_TOKEN =
  'pk.eyJ1IjoieHRyYXBvd2VyIiwiYSI6ImNrNXBsMzJ4azB0b3czbm1vbmQ2YmdrZmMifQ.tOmZu41N2WGmpOUA06y8og';

const DEVICE_MAP_QUERY = gql`
  query DeviceMapQuery($uuid: String!) {
    allIpAddressLocations(condition: { uuid: $uuid }) {
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

function DeviceWorldMap(props) {
  const [viewport, setViewport] = React.useState({
    latitude: 51,
    longitude: 0,
    zoom: 3,
    bearing: 0,
    pitch: 0,
  });

  const { device } = props;
  const { uuid } = device;
  const { data, loading, error } = useQuery(DEVICE_MAP_QUERY, {
    variables: { uuid },
    skip: !uuid,
  });

  const _onViewportChange = viewportNew => setViewport(viewportNew);

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
      onViewportChange={_onViewportChange}
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

DeviceWorldMap.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DeviceWorldMap;
