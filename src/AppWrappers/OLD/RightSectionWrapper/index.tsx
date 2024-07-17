import { useSelector } from 'react-redux';

const RightSectionWrapper = (props: any) => {
    const isCollapsed = useSelector((state) => state.appDetailsReducer.sidebar.isCollapsed) || false;

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflowY: 'scroll', height: '100vh' }} className={` bg-bg-grey ${isCollapsed ? `ml-14` : `ml-60`} transition-[margin] duration-800`}>
            {props.children}
        </div>
    )
};

export default RightSectionWrapper;