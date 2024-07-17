import {
    BrowserRouter as Router
} from 'react-router-dom';
import RoutesApp from './RoutesApp';
import AppDetailsWrapper from '../AppWrappers/AppDetailsWrapper';


const AppRouter = () => {

    return (
        <Router>
            <AppDetailsWrapper>
                <RoutesApp />
            </AppDetailsWrapper>
        </Router>
    )
};

export default AppRouter;