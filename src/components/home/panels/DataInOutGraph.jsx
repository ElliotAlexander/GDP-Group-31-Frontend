import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { Line } from 'react-chartjs-2';

const useStyles = makeStyles({
  container: {},
});

const DEVICES_DATA_QUERY = gql`
  query MyQuery {
    allDeviceDataSumOverTimes(orderBy: TIMESTAMP_ASC, last: 50) {
      edges {
        node {
          dataOut
          dataIn
          dataTransferred
          timestamp
        }
      }
    }
  }
`;

function convertBytesToHumanReadable(byteCount) {
  if (byteCount < 1000) {
    return `${byteCount} Bytes`;
  }

  const KbCount = byteCount / 1000;
  if (KbCount > 1000) {
    const MbCount = Math.round((KbCount / 1000) * 100) / 100;
    return `${MbCount} Mb`;
  }
  const KbCountRounded = Math.round(KbCount * 100) / 100;
  return `${KbCountRounded} Kb`;
}

function DataInOutGraph() {
  const classes = useStyles();
  const { loading, error, data } = useQuery(DEVICES_DATA_QUERY);

  if (loading)
    return <CircularProgress id="loading" className={classes.load} />;
  if (error)
    return (
      <p id="error" className={classes.load}>
        Error :(
      </p>
    );
  const timestamps = [];
  const dataPointsDataTransferred = [];
  for (let i = 0; i < data.allDeviceDataSumOverTimes.edges.length; i += 1) {
    if (i > 0) {
      timestamps.push(
        new Date(
          data.allDeviceDataSumOverTimes.edges[i].node.timestamp,
        ).getTime(),
      );
      dataPointsDataTransferred.push(
        parseFloat(
          convertBytesToHumanReadable(
            data.allDeviceDataSumOverTimes.edges[i].node.dataTransferred -
              data.allDeviceDataSumOverTimes.edges[i - 1].node.dataTransferred,
          ),
        ),
      );
    }
  }

  const dataPointsDataIn = [];
  for (let i = 0; i < data.allDeviceDataSumOverTimes.edges.length; i += 1) {
    if (i > 0) {
      dataPointsDataIn.push(
        parseFloat(
          convertBytesToHumanReadable(
            data.allDeviceDataSumOverTimes.edges[i].node.dataIn -
              data.allDeviceDataSumOverTimes.edges[i - 1].node.dataIn,
          ),
        ),
      );
    }
  }

  const dataPointsDataOut = [];
  for (let i = 0; i < data.allDeviceDataSumOverTimes.edges.length; i += 1) {
    if (i > 0) {
      dataPointsDataOut.push(
        parseFloat(
          convertBytesToHumanReadable(
            data.allDeviceDataSumOverTimes.edges[i].node.dataOut -
              data.allDeviceDataSumOverTimes.edges[i - 1].node.dataOut,
          ),
        ),
      );
    }
  }

  const data5 = {
    labels: timestamps,
    datasets: [
      {
        label: 'Data Transferred in Mb',
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,99,132,0.5)',
        hoverBorderColor: 'rgba(255,99,132,1)',
        data: dataPointsDataTransferred,
      },
      {
        label: 'Data Downloaded in Mb',
        backgroundColor: 'rgba(255,140,0,0.2)',
        borderColor: 'rgba(255,140,0,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255,140,0,0.5)',
        hoverBorderColor: 'rgba(255,140,0,1)',
        data: dataPointsDataIn,
      },
      {
        label: 'Data Uploaded in Mb',
        backgroundColor: 'rgba(126, 200, 80,0.2)',
        borderColor: 'rgba(126, 200, 80,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(126, 200, 80,0.5)',
        hoverBorderColor: 'rgba(126, 200, 80,1)',
        data: dataPointsDataOut,
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

export default DataInOutGraph;
