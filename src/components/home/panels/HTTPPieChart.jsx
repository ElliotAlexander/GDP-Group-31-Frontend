import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

const HTTP_QUERY = gql`
  query HttpQuery {
    allDeviceDataSumOverTimes(first: 1, orderBy: TIMESTAMP_DESC) {
        nodes {
          dataOut
          dataIn
          dataTransferred 
        }
      }
  }
`;

const useStyles = makeStyles({
  container: {},
});

const convertBytesToHumanReadable = (byteCount) => {
    if (byteCount < 1000) {
      return `${byteCount} Bytes`;
    }
  
    const KbCount = byteCount / 1000;
    if (KbCount > 1000) {
      const MbCount = KbCount / 1000;
      return `${MbCount} Mb`;
    }
    return `${KbCount} Kb`;
  };

function HttpPieChart(props) {
  const classes = useStyles();
  const { loading, error, data } = useQuery(HTTP_QUERY, {
    pollInterval: 5000,
  });

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );

  const graphData = [];
  const graphLabels = ['Uploaded Traffic', 'Downloaded Traffic'];

  if(data.allDeviceDataSumOverTimes.nodes.length > 0){
    graphData.push(data.allDeviceDataSumOverTimes.nodes[0].dataOut);
    graphData.push(data.allDeviceDataSumOverTimes.nodes[0].dataIn);
  }

  const data5 = {
    labels: graphLabels,
    datasets: [
      {
        borderWidth: 1,
        hoverBackgroundColor: ['rgba(255,99,132,0.4)', 'rgba(0, 0, 0, 0.4)'],
        backgroundColor: ['rgba(255,99,132,0.25)', 'rgba(0, 0, 0,0.25)'],
        data: graphData,
      },
    ],
  };
  return (
    <Paper style={{ height: '100%', paddingBottom: '10px' }}>
      <Pie
        style={{ paddingTop: '100px' }}
        data={data5}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          legend: {
            labels: {
              fontColor: 'white',
            },
          },
          tooltips: {
            callbacks: {
              // eslint-disable-next-line no-shadow
              label(tooltipItem, data) {
                const dataset = data.datasets[tooltipItem.datasetIndex];
                const currentValue = dataset.data[tooltipItem.index];
                return convertBytesToHumanReadable(currentValue);
              },
            },
          },
        }}
      />
    </Paper>
  );
}

HttpPieChart.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default HttpPieChart;
