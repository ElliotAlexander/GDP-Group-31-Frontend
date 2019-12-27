import React from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import DeviceGrid from './DeviceGrid';

class DevicePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      uuid: '',
    };
  }

  componentDidMount() {
    const { location } = this.props;
    const values = queryString.parse(location.search);
    this.setState({
      uuid: values.device,
    });
  }

  render() {
    const { uuid } = this.state;
    return (
      <div>
        <h1> Pad </h1>
        <DeviceGrid uuid={uuid} />
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
