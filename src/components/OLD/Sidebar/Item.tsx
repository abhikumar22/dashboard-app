const Item = ({
    icon,
    title,
    isSelected,
    handleClick,
    isOnlyIcon,
}) => {
    return (
        <div
            onClick={handleClick}
            className={`${isSelected ? 'border-brand-color-light border-t-2 border-b-2 ' : ''} `}>
            <div
                className={`
                pl-4 mx-3 my-2.5 flex items-center cursor-pointer rounded-md py-2 
                ${isSelected ? 'bg-brand-color-light' : ''}
                ${isOnlyIcon ? 'pr-3.5 pb-3 pt-3' : ''}
                `}>
                <img
                    src={icon}
                    className="w-3"
                />
                <div className={`text-white ml-3 text-base cursor-pointer ${isSelected ? `font-bold` : `font-light`}`}>{title}</div>
            </div>
        </div>
    )
};

export default Item;