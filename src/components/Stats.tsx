import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, plugins, registerables } from 'chart.js';
import { countGenres } from '../scripts/apiQueryFuncs';

// Register the necessary components
Chart.register(...registerables);

export default function Stats({ data }: any) {
    const jsonData = countGenres(data);

    // Extracting genres and frequencies into separate arrays
    let genres: string[] = Object.keys(jsonData);
    let frequencies: number[] = Object.values(jsonData);

    // Sort the genres and frequencies by frequency in descending order
    const sortedIndices = frequencies
        .map((value, index) => ({ value, index }))
        .sort((a, b) => b.value - a.value)
        .map(({ index }) => index);

    genres = sortedIndices.map(index => genres[index]);
    frequencies = sortedIndices.map(index => frequencies[index]);

    // Select only the top 5 genres for the legend
    const topGenres = genres.slice(0, 5);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    useEffect(() => {
        const createChart = () => {
            if (canvasRef.current) {
                const config: ChartConfiguration = {
                    type: 'doughnut',
                    data: {
                        labels: genres,
                        datasets: [{
                            data: frequencies,
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)',
                                'rgb(75, 192, 192)',
                                'rgb(153, 102, 255)',
                                // Add more colors if needed
                            ],
                            hoverOffset: 4
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: true,
                        aspectRatio: 2|2,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: {
                                    padding: 30,
                                    filter: (legendItem) => {
                                        // Display only the top 5 items in the legend
                                        return topGenres.includes(legendItem.text);
                                        
                                    }
                                }
                            }
                        }
                    },
                };

                // Create a new chart instance and store it in the ref
                chartRef.current = new Chart(canvasRef.current, config);
            }
        };

        // Destroy the previous chart if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
            chartRef.current = null;
        }

        createChart();

        // Cleanup function to destroy the chart when the component unmounts or before re-rendering
        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <div className='flex flex-col justify-center items-center align-center my-16'>
            <h3>Top Genres</h3>
            <div className='my-8' style={{width: '50rem'}}>
                <canvas ref={canvasRef} id="myChart"></canvas>
            </div>
        </div>
    );
}
