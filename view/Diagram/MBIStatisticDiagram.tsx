'use client';
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

interface BarChartProps {
  date: string[];
  amounts: number[];
  name: string;
}

const MBIStatisticDiagram: React.FC<BarChartProps> = ({ date, amounts, name }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (chartRef.current) {
      const chartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: {
            labels: ['Группа 1', 'Группа 2', 'Группа 3', 'Группа 4'],
            datasets: [
              {
                  label: 'Серия A',
                  data: [12, 19, 3, 5], // Dанные для первой группы
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
              },
              {
                  label: 'Серия B',
                  data: [2, 3, 20, 15], // Данные для второй группы
                  backgroundColor: 'rgba(54, 162, 235, 0.5)',
              },
              {
                  label: 'Серия C',
                  data: [3, 10, 13, 7], // Данные для третьей группы
                  backgroundColor: 'rgba(75, 192, 192, 0.5)',
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
                text: 'Групповая столбчатая диаграмма',
                color: 'black',
                font: {
                  weight: 'bold',
                  size: 20,
                }
              },
            },
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
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

export default MBIStatisticDiagram;