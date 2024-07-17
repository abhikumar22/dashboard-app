import SystemMetrics from '../Overview/SystemMetrics';
import ServiceInfo from '../Overview/ServiceInfo';
import EventHistory from '../../ApplicationItems/EventHistory'

const Overview = () => {
    return (
        <div>
            <ServiceInfo />
            <div className='flex gap-3'>
                <SystemMetrics />
                <EventHistory />
            </div>
        </div>
    )
};

export default Overview;