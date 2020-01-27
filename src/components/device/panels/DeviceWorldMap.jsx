import React, { Component } from 'react';
import { render } from 'react-dom';
import MapGL, { Source, Layer } from 'react-map-gl';
import { json as requestJson } from 'd3-request';
import { gql } from 'apollo-boost';
import ControlPanel from './control-panel';
import { heatmapLayer } from './map-style';
import { useQuery } from '@apollo/react-hooks';

const MAPBOX_TOKEN =
  'pk.eyJ1IjoieHRyYXBvd2VyIiwiYSI6ImNrNXBsMzJ4azB0b3czbm1vbmQ2YmdrZmMifQ.tOmZu41N2WGmpOUA06y8og'; // Set your mapbox token here

const DEVICE_MAP_QUERY = gql`
  query UpDownData($uuid: String!) {
    deviceStatByUuid(uuid: $uuid) {
      dataIn
      dataOut
    }
  }
`;
function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter(feature => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return { type: 'FeatureCollection', features };
}

function collectData(props) {
  const { data } = useQuery(DEVICE_MAP_QUERY, {
    variables: props.device.uuid,
    skip: !props.device.uuid,
  });

  console.log(data);
}

function DeviceWorldMap(props) {


  this.state = {
    viewport: {
      latitude: 40,
      longitude: -100,
      zoom: 3,
      bearing: 0,
      pitch: 0,
    },
    allDay: true,
    startTime: current,
    endTime: current,
    selectedTime: current,
    earthquakes: null,
  };

  requestJson(
    'https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson',
    (error, response) => {
      if (!error) {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const { features } = response;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        this.setState({
          data: response,
          earthquakes: response,
          endTime,
          startTime,
          selectedTime: endTime,
        });
      }
    },
  );

  current = new Date().getTime();
  this._handleChangeDay = this._handleChangeDay.bind(this);
  this._handleChangeAllDay = this._handleChangeAllDay.bind(this);


  console.log(props.device.uuid);





  _onViewportChange = viewport => this.setState({ viewport });

  _handleChangeDay = time => {
    this.setState({ selectedTime: time });
    if (this.state.earthquakes) {
      this.setState({
        data: filterFeaturesByDay(this.state.earthquakes, time),
      });
    }
  };

  _handleChangeAllDay = allDay => {
    this.setState({ allDay });
    if (this.state.earthquakes) {
      this.setState({
        data: allDay
          ? this.state.earthquakes
          : filterFeaturesByDay(
            this.state.earthquakes,
            this.state.selectedTime,
          ),
      });
    }
  };

  const {
    viewport,
    data,
    allDay,
    selectedTime,
    startTime,
    endTime,
  } = this.state;

  return (
    <div style={{ height: '100%' }}>
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/dark-v9"
        onViewportChange={this._onViewportChange}
        mapboxApiAccessToken={MAPBOX_TOKEN}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...heatmapLayer} />
          </Source>
        )}
      </MapGL>
      <ControlPanel
        containerComponent={this.props.containerComponent}
        startTime={startTime}
        endTime={endTime}
        selectedTime={selectedTime}
        allDay={allDay}
        onChangeDay={this._handleChangeDay}
        onChangeAllDay={this._handleChangeAllDay}
      />
    </div>
  );
}

export function renderToDom(container) {
  render(<DeviceWorldMap />, container);
}
