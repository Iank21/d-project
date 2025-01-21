'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  date: string[];
  dataset: any[];
  name: string;
}

const MBIStatisticDiagram: React.FC<BarChartProps> = ({ date, dataset, name }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: date,
            datasets: dataset
          },
          plugins: [ChartDataLabels],
          options: {
            responsive: true,
            plugins: {
              datalabels: {
                color: 'black'
              },
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
              title: {
                display: true,
                text: name,
                color: 'black',
                font: {
                  weight: 'bold',
                  size: 20,
                }
              },
            },
          },
      });

      return () => {
        chartInstance.destroy();
      };
    }
  }, [dataset]);

  return <canvas className='max-size-canvas' ref={chartRef} />;
};

export default MBIStatisticDiagram;