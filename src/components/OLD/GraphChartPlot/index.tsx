import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const ChartComponent = ({ plotData, options }) => {
    if (plotData && plotData.length <= 0) return
    return (
        <div style={{ width: '600px' }}>
            <Line
                data={plotData}
                options={options}
            />
        </div>
    );
};

export default ChartComponent;
