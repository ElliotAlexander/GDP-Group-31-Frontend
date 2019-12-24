import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = () => ({
  toprow: {
    backgroundColor: 'lightgreen',
  },
  middlerow: {
    backgroundColor: 'lightblue',
  },
  bottomrow: {
    backgroundColor: 'pink',
  },
});

class DeviceGrid extends React.Component {
  render() {
    const { classes } = this.props;
    const dimensions = {
      lg: [
        { i: 'up-down', x: 0, y: 0, w: 1, h: 2, static: true },
        { i: 'data', x: 1, y: 0, w: 1, h: 2, static: true },
        { i: 'ip-count', x: 2, y: 0, w: 1, h: 2, static: true },
        { i: 'dunno', x: 3, y: 0, w: 1, h: 2, static: true },

        { i: 'at-risk', x: 0, y: 2, w: 1, h: 5, static: true },
        { i: 'device-info', x: 1, y: 2, w: 2, h: 5, static: true },
        { i: 'http-packets', x: 3, y: 2, w: 1, h: 5, static: true },

        { i: 'timeline', x: 0, y: 7, w: 2, h: 7, static: true },
        { i: 'world-map', x: 2, y: 7, w: 2, h: 7, static: true },
      ],
    };
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={dimensions}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 4, md: 4, sm: 4, xs: 1, xxs: 1 }}
        rowHeight={50}
        width={1200}
      >
        <div className={classes.toprow} key="up-down">
          Up-Down Data
        </div>
        <div className={classes.toprow} key="data">
          Total Data
        </div>
        <div className={classes.toprow} key="ip-count">
          IPs Connected
        </div>
        <div className={classes.toprow} key="dunno">
          ??????
        </div>
        <div className={classes.middlerow} key="at-risk">
          At-Risk
        </div>
        <div className={classes.middlerow} key="device-info">
          Device Info Table
        </div>
        <div className={classes.middlerow} key="http-packets">
          HTTP-packets
        </div>
        <div className={classes.bottomrow} key="timeline">
          Security Rating Timeline
        </div>
        <div className={classes.bottomrow} key="world-map">
          World Map
        </div>
      </ResponsiveGridLayout>
    );
  }
}

DeviceGrid.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(DeviceGrid);
