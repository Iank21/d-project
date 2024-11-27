'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  categories: string[];
  amounts: number[];
}

const MbiDiagram: React.FC<BarChartProps> = ({ categories, amounts }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  let chartColors = {
    color1: '',
    color2: '',
    color3: ''
  };

  if(amounts[0] <= 15){
    chartColors.color1 = 'green'
  }
  if(amounts[0] >= 16 && amounts[0] <= 24){
    chartColors.color1 = 'orange'
  }
  if(amounts[0] >= 25){
    chartColors.color1 = 'red'
  }

  if(amounts[1] <= 5){
    chartColors.color2 = 'green'
  }
  if(amounts[1] >= 6 && amounts[1] <= 10){
    chartColors.color2 = 'orange'
  }
  if(amounts[1] >= 11){
    chartColors.color2 = 'red'
  }

  if(amounts[2] <= 30){
    chartColors.color3 = 'red'
  }
  if(amounts[2] >= 31 && amounts[2] <= 36){
    chartColors.color3 = 'orange'
  }
  if(amounts[2] >= 37){
    chartColors.color3 = 'red'
  }

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: ['«Психоэмоциональное истощение»', '«Деперсонализация»', '«Редукция личных достижений»'],
            datasets: [
              {
                data: amounts,
                backgroundColor: [
                  chartColors.color1,
                  chartColors.color2,
                  chartColors.color3,
                ],
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
  }, [categories, amounts]);

  return <canvas className='max-h-52' ref={chartRef} />;
};

export default MbiDiagram;