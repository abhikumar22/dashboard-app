import { useState } from 'react';
import { useSelector } from "react-redux";
import Item from './Item';
import GraphChartPlot from '../../../GraphChartPlot';
import UseGraphDataModifier from '../../../../hooks/UseGraphDataModifier';

const SystemMetrics = () => {
    const [currTab, setCurrTab] = useState('CPU');
    const memoryStatsList = useSelector((state) => state.applicationReducer.memoryUtilization.memoryStatsList) || [];
    const cpuStatsList = useSelector((state) => state.applicationReducer.cpuUtilisation.cpuStatsList) || [];

    const changeTab = () => {
        if (currTab === 'CPU') {
            setCurrTab('Memory');
        } else {
            setCurrTab('CPU');
        }
    };
    const isTabCPU = !!(currTab === 'CPU');

    const cpuPlotData = UseGraphDataModifier({ data: cpuStatsList, type: 'cpuUtilization' });
    const memoryPlotData = UseGraphDataModifier({ data: memoryStatsList, type: 'memoryUtilization' });

    return (

        <div className="p-5 bg-green mt-5 bg-white border rounded-md flex-1 shadow-lg md:shadow-md">
            <div className="">
                System Metrics
            </div>
            <div className='w-100'>
                <div className='flex pt-5'>
                    <Item handleClick={() => changeTab()} isSelected={isTabCPU} text={"CPU"} />
                    <Item handleClick={() => changeTab()} isSelected={!isTabCPU} text={"Memory"} />
                </div>
                <div>
                    {isTabCPU ?
                        <GraphChartPlot plotData={cpuPlotData?.data || []} options={cpuPlotData?.options || {}} />
                        :
                        <GraphChartPlot plotData={memoryPlotData?.data || []} options={memoryPlotData?.options || {}} />
                    }
                </div>
            </div>
        </div>

    )
};

export default SystemMetrics;