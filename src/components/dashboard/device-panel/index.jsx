import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import DeviceGrid from './DeviceGrid';

class DevicePanel extends React.Component {
  componentDidMount() {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    console.log(values.device); // "top"
  }

  render() {
    return (
      <div>
        <h1> Pad </h1>
        <DeviceGrid />
      </div>
    );
  }
}

DevicePanel.propTypes = {
  location: PropTypes.shape({
    search: PropTypes.string.isRequired,
  }).isRequired,
};

export default DevicePanel;
