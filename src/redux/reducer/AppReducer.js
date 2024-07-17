import {
    ADD_APPLICATION,
    CHANGE_APPLICATION,
    TOGGLE_SIDEBAR
} from '../action';

const initialState = {
    applications: [],
    currentApplication: {},
    sidebar: {
        isCollapsed: false
    }
}

const ApplicationReducer = (state = initialState, actionData) => {
    const { type, data } = actionData;
    switch (type) {
        case ADD_APPLICATION:
            return {
                ...state,
                applications: [...data.data],
                currentApplication: {
                    ...data?.data[0]
                }
            };
        case CHANGE_APPLICATION:
            return {
                ...state,
                currentApplication: {
                    ...state.applications.find(item => item.name === data)
                }
            }
        case TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebar: {
                    isCollapsed: !(state.sidebar.isCollapsed),
                }
            }
        default:
            return state;
    }
}
export default ApplicationReducer