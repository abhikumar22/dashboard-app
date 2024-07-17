const Item = ({ isSelected, text, handleClick }) => {
    return (
        <div onClick={handleClick} className={
            `flex-1 text-center cursor-pointer
                ${isSelected ? `text-brand-color-light` : ``} 
                ${isSelected ? `font-bold` : ``}

                ${isSelected ? `text-brand-color-light` : ``} 
                ${isSelected ? `font-bold` : ``}
            `}>
            {text}
        </div>
    )
}

export default Item;