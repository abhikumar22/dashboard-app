// src/components/Dropdown.jsx
import { useState } from 'react';
import ARROW_DOWN from '../../assets/icons/ARROW_DOWN.svg';

import './style.css'; // Assuming you have a CSS file for styling

const Dropdown = ({ label, options, handleClick = () => { } }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    const selectOption = (currOption: string) => {
        handleClick(currOption);
        setIsOpen(false);
    }

    return (
        <div className="dropdown">
            <button className={`dropdown-button items-center`} onClick={toggleDropdown}>
                {label} <span className="arrow">
                    <img
                        src={ARROW_DOWN}
                        className={`ml-2 items-center transition-all ${isOpen ? `rotate-180` : ``}`}
                    />
                </span>
            </button>
            {isOpen && (
                <div className="dropdown-menu">
                    {options.map((option, index) => (
                        <div key={index} className="dropdown-item" onClick={() => selectOption(option)}>
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dropdown;
