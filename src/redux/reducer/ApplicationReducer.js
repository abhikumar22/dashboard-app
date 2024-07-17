import {
    ADD_CPU_UTILISATION,
    ADD_MEMORY_UTILIZATION,
    ADD_EVENT_HISTORY,
} from '../action';

const initialState = {
    cpuUtilisation: {
        cpuStatsList: []
    },
    memoryUtilization: {
        memoryStatsList: []
    },
    eventHistory: {
        eventHistoryStatsList: []
    },
}

const ApplicationReducer = (state = initialState, actionData) => {
    const { type, id, data } = actionData;
    switch (type) {
        case ADD_CPU_UTILISATION:
            return {
                ...state,
                cpuUtilisation: {
                    cpuStatsList: [...actionData.data]
                },
            };

        case ADD_MEMORY_UTILIZATION:
            return {
                ...state,
                memoryUtilization: {
                    memoryStatsList: [...actionData.data]
                },
            };
        case ADD_EVENT_HISTORY:
            return {
                ...state,
                eventHistory: {
                    eventHistoryStatsList: [...actionData.data]
                },
            };
        default:
            return state;
    }
}
export default ApplicationReducer