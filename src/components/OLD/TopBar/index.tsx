import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { CHANGE_APPLICATION } from '../../redux/action';
import Dropdown from "../Dropdown";

const TopBar = () => {

    // JS PART START
    const [currApp, setApp] = useState<string>('');
    const [appOptions, setAppOptions] = useState<string[]>([]);
    const dispatch = useDispatch();

    const applications = useSelector((state) => state.appDetailsReducer.applications) || [];

    useEffect(() => {
        if (applications && applications.length > 0) {
            const options = applications.map((ele) => {
                return ele?.name || ''
            })
            setAppOptions(options);
            setApp(options[0]);
        }
    }, [applications]);

    const toggleApp = (data: string) => {
        setApp(data);
        dispatch({
            type: CHANGE_APPLICATION,
            data: data
        })
    };

    // JS PART END

    // HTML | JSX START
    return (
        <div className="top_bar border-b border-grey-medium pt-4 pb-1.5">
            <div className="px-10 pb">
                <div className="main flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-color-grey-light">Applications</span>

                        <Dropdown
                            options={appOptions}
                            label={currApp}
                            handleClick={toggleApp}
                        />

                    </div>
                    <div>
                        <Dropdown
                            options={[
                                'abhishek',
                            ]}
                            label={'abhishek'}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
    // HTML | JSX END
};

export default TopBar;