import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { Line } from 'react-chartjs-2';

const ON_RENDER_QUERY = gql`
  query MyQuery($uuid: String!) {
    allDeviceStatsOverTimes(
      condition: { uuid: $uuid }
      last: 10
      orderBy: TIMESTAMP_ASC
    ) {
      edges {
        node {
          dataTransferred
          timestamp
        }
      }
    }
  }
`;

const useStyles = makeStyles({
  container: {},
});

function convertBytesToHumanReadable(byteCount) {
  if (byteCount < 1000) {
    return `${byteCount} Bytes`;
  }

  const KbCount = byteCount / 1000;
  if (KbCount > 1000) {
    const MbCount = Math.round((KbCount / 1000) * 100) / 100;
    return `${MbCount}`;
  }
  const KbCountRounded = Math.round(KbCount * 100) / 100;
  return `${KbCountRounded} Kb`;
}

function DeviceTransferredGraph(props) {
  const classes = useStyles();
  const { device } = props;
  const { uuid } = device;
  const { loading, error, data } = useQuery(ON_RENDER_QUERY, {
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

  // data1 = processTimestampData(data.allDeviceStatsOverTimes);
  const timestamps = [];
  const dataPoints = [];
  for (let i = 0; i < data.allDeviceStatsOverTimes.edges.length; i += 1) {
    timestamps.push(
      new Date(
        new Date(
          data.allDeviceStatsOverTimes.edges[i].node.timestamp,
        ).getTime(),
      ).toUTCString(),
    );
    dataPoints.push(
      parseFloat(
        convertBytesToHumanReadable(
          data.allDeviceStatsOverTimes.edges[i].node.dataTransferred,
        ),
      ),
    );
  }
  const data5 = {
    labels: timestamps,
    datasets: [
      {
        label: 'Data Transferred in Mb',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.4)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataPoints,
      },
    ],
  };
  return (
    <Line
      data={data5}
      options={{
        backgroundColor: 'lightblue',
        maintainAspectRatio: false,
        legend: {
          labels: {
            fontColor: 'white',
          },
        },
        scales: {
          xAxes: [
            {
              ticks: {
                fontColor: 'white',
                display: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                fontColor: 'white',
              },
            },
          ],
        },
      }}
    />
  );
}

DeviceTransferredGraph.propTypes = {
  device: PropTypes.shape({
    uuid: PropTypes.string,
  }),
};

export default DeviceTransferredGraph;
