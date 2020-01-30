import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DevicesInfoTable from './panels/DeviceInfoTable';
import DevicesConnected from './panels/DevicesConnected';
import DataUpDownPanel from './panels/DataUpDownPanel';
import DeviceRatingFilterPanel from './panels/DeviceRatingFilterPanel';
import DataInOutGraph from './panels/DataInOutGraph';
import DeviceWorldMap from './panels/DeviceWorldMap';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = () => ({});

class DashboardGrid extends React.Component {
  render() {
    const { classes } = this.props;
    const layouts = {
      lg: [
        { i: 'a', x: 0, y: 0, w: 2, h: 2, static: true },
        { i: 'b', x: 2, y: 0, w: 2, h: 2, static: true },
        { i: 'c', x: 4, y: 0, w: 2, h: 2, static: true },

        { i: 'd', x: 0, y: 2, w: 3, h: 6, static: true },
        { i: 'e', x: 3, y: 2, w: 3, h: 6, static: true },

        { i: 'f', x: 0, y: 8, w: 4, h: 5, static: true },
        { i: 'g', x: 4, y: 8, w: 2, h: 5, static: true },
      ],
    };
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={50}
      >
        <div key="a">
          <DeviceRatingFilterPanel />
        </div>
        <div key="b">
          <DevicesConnected />
        </div>
        <div key="c">
          <DataUpDownPanel />
        </div>
        <div key="d">
          <DataInOutGraph />
        </div>
        <div key="e">
          <DeviceWorldMap />
        </div>
        <div key="f">
          <DevicesInfoTable />
        </div>
        <div key="g">Security Rating Timeline</div>
      </ResponsiveGridLayout>
    );
  }
}

DashboardGrid.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(DashboardGrid);
