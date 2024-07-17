import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { TOGGLE_SIDEBAR } from '../../redux/action';
import Item from './Item';
import { capatiliseFirstLetter } from '../../utils';
import KAPSTAN_LOGO from '../../assets/icons/KAPSTAN_LOGO.svg';
import APPLICATIONS_ICON from '../../assets/icons/APPLICATION_ICON.svg'
import ADMIN_ICON from '../../assets/icons/ADMIN_ICON.svg'
import CONNECTIONS_ICON from '../../assets/icons/CONNECTIONS_ICON.svg'
import COST_ICON from '../../assets/icons/COST_ICON.svg'
import DOCS_ICON from '../../assets/icons/DOCS_ICON.svg'
import SECURITY_ICON from '../../assets/icons/SECURITY_ICON.svg'
import ARROW_ICON from '../../assets/icons/ARROW_ICON.svg'

// constants
const NAV_OPTIONS = [
    "APPLICATIONS",
    "CONNECTIONS",
    "COST",
    "SECURITY",
    "ADMIN",
    "DOCS"];
const NAV_ICONS = {
    APPLICATIONS_ICON,
    ADMIN_ICON,
    CONNECTIONS_ICON,
    COST_ICON,
    DOCS_ICON,
    SECURITY_ICON,
    ARROW_ICON,
}

const Sidebar = () => {
    const isCollapsed = useSelector((state) => state.appDetailsReducer.sidebar.isCollapsed) || false;
    const [selectedOption, setSelectedOption] = useState(NAV_OPTIONS[0]);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleOptionSelection = (option: string) => {
        setSelectedOption(option);
        if (option.toLowerCase() === 'applications') {
            navigate(`/`);
            return
        }
        navigate(`/${option.toLowerCase()}`);
    };
    const toggleSidebar = () => {
        dispatch({
            type: TOGGLE_SIDEBAR,
        })
    }
    return (
        <div className={`Side_Bar ${isCollapsed ? `w-16` : `w-60`} bg-brand-color pb-20 h-screen fixed l-0 t-0 z-10`}>
            <div className="h-screen flex flex-col justify-between">
                <div>
                    <div className={`${!isCollapsed ? `p-4` : `p-5`} flex items-center`}>
                        <img
                            src={KAPSTAN_LOGO}
                            className="w-8"
                        />
                        {!isCollapsed && <div className="text-white ml-3 font-bold text-xl">Kapstan</div>}
                    </div>
                    {NAV_OPTIONS.slice(0, 4).map((nav) => {
                        const isSelected = !!(selectedOption === nav);
                        return (
                            <Item
                                key={nav}
                                icon={NAV_ICONS[`${nav}_ICON`]}
                                title={isCollapsed ? `` : capatiliseFirstLetter(nav)}
                                isSelected={isSelected}
                                handleClick={() => handleOptionSelection(nav)}
                                isOnlyIcon={isCollapsed}
                            />
                        )
                    })}
                </div>
                <div className="">
                    {NAV_OPTIONS.slice(4, 6).map((nav) => {
                        const isSelected = !!(selectedOption === nav);
                        return (
                            <Item
                                key={nav}
                                icon={NAV_ICONS[`${nav}_ICON`]}
                                title={isCollapsed ? `` : capatiliseFirstLetter(nav)}
                                isSelected={isSelected}
                                handleClick={() => handleOptionSelection(nav)}
                                isOnlyIcon={isCollapsed}
                            />
                        )
                    })}
                    <Item
                        icon={ARROW_ICON}
                        isSelected={false}
                        handleClick={toggleSidebar}
                    />
                </div>
            </div>
        </div>
    )
};

export default Sidebar;