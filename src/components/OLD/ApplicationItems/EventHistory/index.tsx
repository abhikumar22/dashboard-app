import { useState } from 'react';
import { useSelector } from 'react-redux';
import StatusChip from '../../StatusChip';

const EVENT_TO_SHOW = 4;
const EVENT_STATUS: any = {
    in_progress: {
        status: 'progress',
        name: 'In progress'
    },
    failed: {
        name: 'Failed',
        status: 'failed'
    },
    successful: {
        name: 'Successful',
        status: 'success'
    }
};

const EventHistory = () => {
    const eventHistoryList = useSelector((state) => state.applicationReducer.eventHistory.eventHistoryStatsList) || [];
    const [visibleCount, setVisibleCount] = useState(4);

    const toggleView = () => {
        if (visibleCount === EVENT_TO_SHOW) {
            setVisibleCount(eventHistoryList.length);
        } else {
            setVisibleCount(EVENT_TO_SHOW);
        }
    };

    const convertTimestamp = (timestamp) => {
        const now = Date.now();
        const units = [
            { unit: 'year', milliseconds: 1000 * 60 * 60 * 24 * 365 },
            { unit: 'week', milliseconds: 1000 * 60 * 60 * 24 * 7 },
            { unit: 'day', milliseconds: 1000 * 60 * 60 * 24 },
            { unit: 'hour', milliseconds: 1000 * 60 * 60 },
            { unit: 'minute', milliseconds: 1000 * 60 },
            { unit: 'second', milliseconds: 1000 }
        ];

        const timestampMs = parseInt(timestamp) * 1000; // Convert seconds to milliseconds
        const diff = now - timestampMs;

        for (const unit of units) {
            const value = Math.floor(diff / unit.milliseconds);
            if (value > 0) {
                return `${value} ${unit.unit}${value > 1 ? 's' : ''} ago`;
            }
        }

        return 'Just now';
    };

    return (
        <div className="p-5 bg-green mt-5 bg-white border rounded-md flex-1 shadow-lg md:shadow-md">
            <div className="font-bold text-color-grey-light text-base">
                Event History
            </div>
            <table className="w-full border-collapse mb-4 mt-4">
                <thead>
                    <tr>
                        <th className="text-left p-2 border-b pl-10">Event</th>
                        <th className="text-left p-2 border-b pl-10">Version</th>
                        <th className="text-left p-2 border-b pl-10">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {eventHistoryList.slice(0, visibleCount).map((event, index) => {
                        const time = convertTimestamp(event.timestamp);
                        return (
                            <tr key={index} className="border-b">
                                <td className="p-2  pl-10">
                                    <div>{event.event}</div>
                                    <div className="text-xs text-gray-500">{time}</div>
                                </td>
                                <td className="p-2  pl-10">{event.version}</td>
                                <StatusChip
                                    text={EVENT_STATUS[event.status].name}
                                    status={EVENT_STATUS[event.status].status}
                                />
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <a onClick={toggleView} className="text-purple-600 hover:underline  pl-10 cursor-pointer underline">
                {`${visibleCount === EVENT_TO_SHOW ? `View more` : `View Less`}`}
            </a>
        </div>
    )
}

export default EventHistory;
