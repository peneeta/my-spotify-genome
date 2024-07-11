import { useEffect, useRef } from 'react';
import { Chart, ChartConfiguration, ChartDataset,registerables } from 'chart.js';
import { countGenres } from '../scripts/apiQueryFuncs';

// Register the necessary components
Chart.register(...registerables);

export default function Stats({ data }: any) {
    const jsonData = countGenres(data);
    const colors = [
        // Neon Pink to Neon Purple
        "rgba(255, 0, 110, 1)", "rgba(239, 0, 125, 1)", "rgba(223, 0, 140, 1)", "rgba(207, 0, 155, 1)", "rgba(191, 0, 170, 1)",
        "rgba(175, 0, 185, 1)", "rgba(159, 0, 200, 1)", "rgba(143, 0, 215, 1)", "rgba(127, 0, 230, 1)", "rgba(111, 0, 245, 1)",
        "rgba(95, 0, 255, 1)", "rgba(79, 0, 255, 1)", "rgba(63, 0, 255, 1)", "rgba(47, 0, 255, 1)", "rgba(31, 0, 255, 1)",
        // Neon Purple to Neon Green
        "rgba(143, 0, 215, 1)", "rgba(135, 16, 200, 1)", "rgba(127, 32, 185, 1)", "rgba(119, 48, 170, 1)", "rgba(111, 64, 155, 1)",
        "rgba(103, 80, 140, 1)", "rgba(95, 96, 125, 1)", "rgba(87, 112, 110, 1)", "rgba(79, 128, 95, 1)", "rgba(71, 144, 80, 1)",
        "rgba(63, 160, 65, 1)", "rgba(55, 176, 50, 1)", "rgba(47, 192, 35, 1)", "rgba(39, 208, 20, 1)", "rgba(31, 224, 5, 1)",
        // Neon Green to Neon Blue
        "rgba(63, 160, 65, 1)", "rgba(72, 168, 85, 1)", "rgba(81, 176, 105, 1)", "rgba(90, 184, 125, 1)", "rgba(99, 192, 145, 1)",
        "rgba(108, 200, 165, 1)", "rgba(117, 208, 185, 1)", "rgba(126, 216, 205, 1)", "rgba(135, 224, 225, 1)", "rgba(144, 232, 245, 1)",
        "rgba(153, 240, 255, 1)", "rgba(162, 248, 255, 1)", "rgba(171, 255, 255, 1)", "rgba(180, 255, 255, 1)", "rgba(189, 255, 255, 1)",
        // Neon Blue
        "rgba(0, 128, 255, 1)", "rgba(15, 142, 255, 1)", "rgba(30, 156, 255, 1)", "rgba(45, 170, 255, 1)", "rgba(60, 184, 255, 1)",
        "rgba(75, 198, 255, 1)", "rgba(90, 212, 255, 1)", "rgba(105, 226, 255, 1)", "rgba(120, 240, 255, 1)", "rgba(135, 255, 255, 1)",
        "rgba(150, 255, 255, 1)", "rgba(165, 255, 255, 1)", "rgba(180, 255, 255, 1)", "rgba(195, 255, 255, 1)", "rgba(210, 255, 255, 1)"
    ];
    
    

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
    const topGenres = genres.slice(0, 8);

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const chartRef = useRef<Chart | null>(null);

    interface DoughnutChartDataset extends ChartDataset<'doughnut', number[]> {
        cutout?: string; // Optional if you want to specify it
        circumference?: number;
        rotation?: number;
    }

    const doughnutData: DoughnutChartDataset[] = [{
        
        data: frequencies,
        backgroundColor: colors,
        cutout: '90%',
        circumference: 180,
        rotation: 270,
        borderWidth: 1,
    }]

    useEffect(() => {
        const createChart = () => {
            if (canvasRef.current) {

                const config: ChartConfiguration = {
                    type: 'doughnut',
                    
                    data: {
                        labels: genres,
                        datasets: doughnutData,
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
                                    filter: (legendItem: any) => {
                                        // Display only the top 5 items in the legend
                                        return topGenres.includes(legendItem.text);
                                        
                                    },
                                    color: '#fff',
                                    boxWidth: 20,
                                }
                            }
                        }
                        
                    },
                    
                }
                

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
