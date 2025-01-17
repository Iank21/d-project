'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  amount: number;
}

const PSM25Diagram: React.FC<BarChartProps> = ({ amount }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  let chartColors: string;
  
  if(amount < 101){
    chartColors = '#7AD361'
  }
  if(amount < 155 && amount > 100){
    chartColors = '#DDBA4F'
  }
  if(amount > 154){
    chartColors = '#D75454'
  }

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            // labels: ['«Психоэмоциональное истощение»', '«Деперсонализация»', '«Редукция личных достижений»'],
            datasets: [
              {
                data: amount,
                backgroundColor: chartColors
              },
            ],
          },
          plugins: [ChartDataLabels],
          options: {
            indexAxis: 'y',
            elements: {
              bar: {
                borderWidth: 2,
              }
            },
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
                text: 'Результат теста',
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
  }, [amount]);

  return <canvas className='max-h-52' ref={chartRef} />;
};

export default PSM25Diagram;