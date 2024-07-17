import { useState } from "react";

const UseLocalStorage = ({ key, initialValue }) => {
    // Retrieve data from localStorage if exists, otherwise use initial value
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
            return initialValue;
        }
    });

    // Function to set data into localStorage
    const setData = (value: string) => {
        try {
            // Allow value to be a function to mimic useState
            const valueToStore = value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to localStorage
            window.localStorage.setItem(key, JSON.stringify(valueToStore));
        } catch (error) {
            console.error("Error setting data into localStorage:", error);
        }
    };

    // Function to retrieve data from localStorage
    const retrieveData = () => {
        try {
            return storedValue;
        } catch (error) {
            console.error("Error retrieving data from localStorage:", error);
            return null;
        }
    };

    return [retrieveData, setData];
};

export default UseLocalStorage;
