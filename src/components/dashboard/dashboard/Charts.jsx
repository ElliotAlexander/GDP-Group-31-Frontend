import React from 'react';
import { Pie } from 'react-chartjs-2';
import Title from './Title.jsx';

const data = {
  labels: ['MacBook', 'Alexa', 'Google Home', 'Wifi Scale'],
  datasets: [
    {
      data: [10, 9, 8, 5],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6D24DE'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#6400FF'],
    },
  ],
};

// eslint-disable-next-line react/no-deprecated
export default function Charts() {
  return (
    <div>
      <Title>Security Ratings of Devices</Title>
      <Pie data={data} />
    </div>
  );
}
