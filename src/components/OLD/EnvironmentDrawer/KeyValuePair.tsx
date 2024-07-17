import DELETE_ICON from '../../assets/icons/DELETE_ICON.svg';

const KeyValuePair = ({ label, value, onDelete }) => (
    <div className="flex items-center  mb-4">
        <div className='flex items-center'>
            <label className="block font-medium text-sm text-color-grey-light">Name</label>
            <input type="text" value={label} readOnly className="ml-2 flex-1 border border-gray-300 rounded px-2 py-1" />
        </div>
        <div className='flex items-center'>
            <label className="block  font-medium text-sm text-color-grey-light pl-5">Value</label>
            <input type="text" value={value} readOnly className="ml-2 flex-1 border border-gray-300 rounded px-2 py-1" />
            <button className="text-red-500 hover:text-red-700 focus:outline-none pl-4">
                <img
                    onClick={() => onDelete(label)}
                    src={DELETE_ICON}
                    className='p-2'
                />
            </button>
        </div>
    </div>
);

export default KeyValuePair