// import React from 'react';
// import { gql } from 'apollo-boost';
// import { useQuery } from '@apollo/react-hooks';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import { makeStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import { Line } from 'react-chartjs-2';

// const useStyles = makeStyles({
//   container: {},
// });

// const DEVICES_DATA_QUERY = gql`
//   query DataInOut {
//     allDeviceStatsOverTimes(last: 10, orderBy: TIMESTAMP_ASC) {
//       nodes {
//         dataIn
//         dataOut
//         timestamp
//       }
//     }
//   }
// `;

// function convertBytesToHumanReadable(byteCount) {
//   if (byteCount < 1000) {
//     return `${byteCount} Bytes`;
//   }

//   const KbCount = byteCount / 1000;
//   if (KbCount > 1000) {
//     const MbCount = Math.round((KbCount / 1000) * 100) / 100;
//     return `${MbCount} Mb`;
//   }
//   const KbCountRounded = Math.round(KbCount * 100) / 100;
//   return `${KbCountRounded} Kb`;
// }

// function DataInOutGraph(props) {
//   const classes = useStyles();
//   const { device } = props;
//   const { uuid } = device;
//   const { loading, error, data } = useQuery(DEVICES_DATA_QUERY, {
//     variables: { uuid },
//     skip: !uuid,
//   });

//   if (loading)
//     return <CircularProgress id="loading" className={classes.load} />;
//   if (error)
//     return (
//       <p id="error" className={classes.load}>
//         Error :(
//       </p>
//     );
//   console.log(data);
//   const timestamps = [];
//   const dataPoints = [];
//   for (let i = 0; i < data.allDeviceStatsOverTimes.nodes.length; i += 1) {
//     timestamps.push(
//       new Date(data.allDeviceStatsOverTimes.nodes[i].timestamp).getTime(),
//     );
//     dataPoints.push(
//       parseFloat(
//         convertBytesToHumanReadable(
//           data.allDeviceStatsOverTimes.nodes[i].dataTransferred,
//         ),
//       ),
//     );
//   }
//   function sumInDataFromAllDevices(data) {
//     let dataIn = 0;
//     for (let i = 0; i < data.allDeviceStatsOverTimes.nodes.length; i += 1) {
//       dataIn += parseFloat(data.allDeviceStatsOverTimes.nodes[i].length);
//     }

//     return dataIn;
//   }
//   function sumOutDataFromAllDevices(data) {
//     let dataOut = 0;
//     for (let i = 0; i < data.allDeviceStatsOverTimes.nodes.length; i += 1) {
//       dataOut += parseFloat(data.allDeviceStatsOverTimes.nodes[i].dataOut);
//     }

//     return dataOut;
//   }
//   const data5 = {
//     labels: timestamps,
//     datasets: [
//       {
//         label: 'Data Transferred in Mb',
//         backgroundColor: 'rgba(255,99,132,0.2)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//         hoverBorderColor: 'rgba(255,99,132,1)',
//         data: dataPoints,
//       },
//     ],
//   };
//   return <h1>hello</h1>;
// }

// DataInOutGraph.propTypes = {
//   device: PropTypes.shape({
//     uuid: PropTypes.string,
//   }),
// };

// export default DataInOutGraph;
