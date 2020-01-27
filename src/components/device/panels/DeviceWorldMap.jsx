import React, { Component } from 'react';
import { render } from 'react-dom';
import ReactMapGL, { Source, Layer } from 'react-map-gl';
import PropTypes from 'prop-types';
import { gql } from 'apollo-boost';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { useQuery } from '@apollo/react-hooks';
import { heatmapLayer } from './map-style';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoieHRyYXBvd2VyIiwiYSI6ImNrNXBsMzJ4azB0b3czbm1vbmQ2YmdrZmMifQ.tOmZu41N2WGmpOUA06y8og'; // Set your mapbox token here

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

const useStyles = makeStyles({
  container: {},
});

function DeviceWorldMap(props) {
  const classes = useStyles();
  const [viewport, setViewport] = React.useState({
    latitude: 40,
    longitude: -100,
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
    console.log(error);
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

  console.log(vals);

  /**
 * {
  "type": "Feature",
  "geometry": {
    "type": "Point",
    "coordinates": [125.6, 10.1]
  },
  "properties": {
    "name": "Dinagat Islands"
  }
}
 */
  console.log(data);

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
