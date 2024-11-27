'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  amounts: number[];
  name: string;
}

const CommonDiagram: React.FC<BarChartProps> = ({ amounts, name }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  let chartColors = ['grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey', 'grey'];

  // #DDBA4F orange
  // #7AD361 green
  // #D75454 red

  if(name === 'Статистика стресса') {
    for(let i = 0; i < amounts.length; i++) {
      if(amounts[i] < 101) {
        chartColors[i] = '#7AD361'
      }
      if(amounts[i] < 155 && amounts[i] > 100) {
        chartColors[i] = '#DDBA4F'
      }
      if(amounts[i] > 154) {
        chartColors[i] = '#D75454'
      }
    }
  }

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: ['янв', 'фев', 'мрт', 'апр', 'май', 'июнь', 'июль', 'авг', 'сент', 'окт', 'нояб', 'дек'],
            datasets: [
              {
                data: amounts,
                backgroundColor: chartColors,
              },
            ],
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
                enabled: false,
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
  }, [amounts]);

  return <canvas className='max-h-80 max-w-md' ref={chartRef} />;
};

export default CommonDiagram;