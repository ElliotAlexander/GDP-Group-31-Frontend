import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SummaryPanel from './summary-panel/index';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = () => ({
  a: {
    backgroundColor: 'lightgray',
  },
  b: {
    backgroundColor: 'pink',
  },
  c: {
    backgroundColor: 'lightblue',
  },
});

class HomePanelGrid extends React.Component {
  render() {
    const { classes } = this.props;
    const layouts = {
      lg: [
        { i: 'a', x: 0, y: 0, w: 6, h: 2, static: true },
        // { i: 'b', x: 2, y: 0, w: 2, h: 2, static: true },
        // { i: 'c', x: 4, y: 0, w: 2, h: 2, static: true },

        { i: 'd', x: 0, y: 2, w: 3, h: 6, static: true },
        { i: 'e', x: 3, y: 2, w: 3, h: 6, static: true },

        { i: 'f', x: 0, y: 8, w: 4, h: 3, static: true },
        { i: 'g', x: 4, y: 8, w: 2, h: 3, static: true },
      ],
    };
    return (
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 6, xs: 1, xxs: 1 }}
        rowHeight={50}
        width={1400}
      >
        <div className={classes.a} key="a">
          <SummaryPanel />
        </div>
        {/* <div className={classes.a} key="b">
          100/500
        </div>
        <div className={classes.a} key="c">
          Number of devices
        </div> */}
        <div className={classes.b} key="d">
          Data in/out graph
        </div>
        <div className={classes.b} key="e">
          World Map
        </div>
        <div className={classes.c} key="f">
          Device Info Table
        </div>
        <div className={classes.c} key="g">
          Security Rating Timeline
        </div>
      </ResponsiveGridLayout>
    );
  }
}

HomePanelGrid.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(HomePanelGrid);
