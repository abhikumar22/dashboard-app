import { useSelector } from 'react-redux';
import { getLastUpdatedString } from '../../../../utils';
import TICK_ICON from '../../../../assets/icons/TICK_ICON.svg';

const ServiceInfo = () => {
    const currentApplication = useSelector((state) => state.appDetailsReducer.currentApplication) || [];

    const getSyncStatus = () => {
        if (currentApplication.version === currentApplication.desiredVersion) {
            return "in sync";
        } else {
            return "not in sync";
        }
    }

    return (
        <div className='p-5 bg-green mt-5 bg-white border rounded-md'>
            <div>
                <div>Service Info</div>
                <div className="arrow"></div>
            </div>
            <div className="flex mt-4 w-96">
                <div className="flex-1">
                    <div className="text-color-grey-light text-xs">Current Version</div>
                    <div className="mt-2 flex">
                        <img src={TICK_ICON} className='mr-2' />
                        {getSyncStatus()}</div>
                </div>
                <div className="flex-1">
                    <div className="text-color-grey-light text-xs">Desired Version</div>
                    <div className="mt-2">{currentApplication?.version}</div>
                </div>
            </div>
            <div className='mt-12 flex items-center justify-between'>
                <div>
                    <button
                        className='px-6 py-2 bg-brand-color-medium text-white rounded-md'
                    >Deploy</button>
                </div>
                <div className='text-color-grey-light text-xs'>
                    {getLastUpdatedString(currentApplication?.updatedAt)}
                </div>
            </div>
        </div>
    )
};

export default ServiceInfo;