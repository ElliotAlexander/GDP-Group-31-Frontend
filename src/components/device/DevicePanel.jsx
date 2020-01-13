import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import DeviceGrid from './DeviceGrid';

function mapStateToProps(state) {
  return {
    device: state.device,
  };
}

class DevicePanel extends React.Component {
  render() {
    const { device } = this.props;
    const deviceObj = device.device;
    if (!deviceObj) return <Redirect to="/" />;

    return (
      <div>
        <DeviceGrid device={deviceObj} />
      </div>
    );
  }
}

DevicePanel.propTypes = {
  device: PropTypes.shape({
    device: PropTypes.object,
  }).isRequired,
};

export default connect(mapStateToProps)(DevicePanel);
