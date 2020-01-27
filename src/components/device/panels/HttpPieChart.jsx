import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Pie } from 'react-chartjs-2';

const HTTP_QUERY = gql`
  query HttpQuery($uuid: String!) {
    deviceStatByUuid(uuid: $uuid) {
      httpsPacketCount
      packetCount
    }
  }
`;

const useStyles = makeStyles({
  container: {},
});

function httpPacketCount(data) {
  let httpPackets = 0;
  httpPackets +=
    data.deviceStatByUuid.packetCount - data.deviceStatByUuid.httpsPacketCount;
  return httpPackets;
}

function HttpPieChart(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { loading, error, data } = useQuery(HTTP_QUERY, {
    variables: { uuid },
    skip: !uuid,
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
  const graphLabels = ['HTTP', 'HTTPS'];
  graphData.push(httpPacketCount(data));
  graphData.push(data.deviceStatByUuid.httpsPacketCount);
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
    <Pie
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
              // eslint-disable-next-line no-underscore-dangle
              const meta = dataset._meta[Object.keys(dataset._meta)[0]];
              const { total } = meta;
              const currentValue = dataset.data[tooltipItem.index];
              const percentage = parseFloat(
                ((currentValue / total) * 100).toFixed(1),
              );
              return (
                data.labels[tooltipItem.index] +
                ': ' +
                currentValue +
                ' (' +
                percentage +
                '%)'
              );
            },
          },
        },
      }}
    />
  );
}

HttpPieChart.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default HttpPieChart;
