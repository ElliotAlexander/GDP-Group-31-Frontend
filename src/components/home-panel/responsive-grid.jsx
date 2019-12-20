import React from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const ResponsiveGridLayout = WidthProvider(Responsive);

const useStyles = () => ({
  a: {
    backgroundColor: 'red',
  },
  b: {
    backgroundColor: 'green',
  },
  c: {
    backgroundColor: 'blue',
  },
});

class HomePanelGrid extends React.Component {
  render() {
    const { classes } = this.props;
    // layout is an array of objects, see the demo for more complete usage
    const layout = [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, static: true },
      { i: 'b', x: 1, y: 0, w: 1, h: 2, static: true },
      { i: 'c', x: 2, y: 0, w: 1, h: 2, static: true },
      { i: 'd', x: 3, y: 0, w: 1, h: 2, static: true },
    ];
    return (
      <ResponsiveGridLayout
        className="layout"
        layout={layout}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 3, xs: 1, xxs: 1 }}
        rowHeight={120}
        width={1400}
      >
        <div className={classes.a} key="a">
          a
        </div>
        <div className={classes.b} key="b">
          b
        </div>
        <div className={classes.c} key="c">
          c
        </div>
        <div className={classes.c} key="d">
          d
        </div>
      </ResponsiveGridLayout>
    );
  }
}

HomePanelGrid.propTypes = {
  classes: PropTypes.func.isRequired,
};

export default withStyles(useStyles)(HomePanelGrid);
