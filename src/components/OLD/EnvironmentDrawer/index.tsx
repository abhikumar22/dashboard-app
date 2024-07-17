import { useState } from 'react';
import KeyValuePair from './KeyValuePair';
import CLOSE_ICON from '../../assets/icons/CLOSE_ICON.svg';
import UPWARD_ARROW from '../../assets/icons/UPWARD_ARROW.svg';

const EnvironmentDrawer = ({ closeModal, handleAddEnvs }) => {
    const [file, setFile] = useState(null);
    const [fileContent, setFileContent] = useState('');
    const [envFileData, setEnvFileData] = useState({});

    const handleAddBtnClick = () => {
        handleAddEnvs(envFileData);
        closeModal();
    }

    function deleteKeyFromObject(key: string) {
        // Create a shallow copy of the object to avoid mutating the original object
        const newObj: any = { ...envFileData };
        // Delete the target key from the new object
        delete newObj[key];
        // Return the modified object
        setEnvFileData({ ...newObj });
    }

    const parseEnvContent = (content: any) => {
        try {
            const lines = content.split('\n');
            const variables: any = {};
            lines.forEach((line: any) => {
                const trimmedLine = line.trim();
                if (trimmedLine && !trimmedLine.startsWith('#')) {
                    const [key, value] = trimmedLine.split('=');
                    variables[key.trim()] = value.trim();
                }
            });
            setEnvFileData(variables); {

            }
        } catch (error) {
            alert('Error Parsing .env File, Please check');
        }
    };

    const handleFileChange = (event: any) => {
        const uploadedFile = event.target.files[0];
        checkFileSize(uploadedFile);
        if (uploadedFile && uploadedFile.name.endsWith('.env')) {
            setFile(uploadedFile);
            readFileContent(uploadedFile);
        } else {
            alert('Please upload a .env file.');
        }
    };

    const handleDragOver = (event: any) => {
        event.preventDefault();
    };

    const handleDrop = (event: any) => {
        event.preventDefault();
        const droppedFile = event.dataTransfer.files[0];
        checkFileSize(droppedFile);
        if (droppedFile && droppedFile.name.endsWith('.env')) {
            setFile(droppedFile);
            readFileContent(droppedFile);
        } else {
            alert('Please drop a .env file.');
        }
    };
    const handleClick = () => {
        // Trigger the file input click when the parent div is clicked
        document.getElementById('envFileInput').click();
    };
    const readFileContent = (file: any) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            parseEnvContent(e.target.result)
            setFileContent(e.target.result);
        };
        reader.readAsText(file);

    };

    const checkFileSize = (file: any) => {
        const fileSizeInKB = file?.size / 1024; // Convert size to KB

        if (fileSizeInKB > 5) {
            alert('File size exceeds 5KB');
            return;
        }
    }


    return (
        <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="ENV_DRAWER p-10 bg-white fixed z-10 right-0 top-0 w-6/12 transition[width] duration-800 h-full shadow-custom-shadow">
            <div className="cursor-pointer absolute p-2 right-2.5 top-2.5" onClick={closeModal}>
                <img
                    src={CLOSE_ICON}
                />
            </div>

            {Object.keys(envFileData).length > 0
                ?
                <div className='bg-white text-black  rounded-md p-2 border-grey-light border'>
                    <div>
                        {Object.keys(envFileData).map((currKey) => {
                            return (
                                <KeyValuePair label={currKey} value={envFileData[currKey]} onDelete={deleteKeyFromObject} />)
                        })
                        }
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <button
                            className='px-7 py-2 bg-white text-black border-black border rounded-md font-semibold'
                            onClick={closeModal}
                        >Cancel</button>
                        <button
                            onClick={handleAddBtnClick}
                            className='px-7 py-2 bg-brand-color-medium text-white rounded-md font-semibold'
                        >Add</button>
                    </div>
                </div>
                :
                <div
                    className="border border-grey-light rounded-md p-2"
                    onClick={handleClick}
                >
                    <input
                        type="file"
                        id="envFileInput"
                        // accept=".env"
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                    />
                    <div className="p-4 pt-6 border-2 border-grey-medium border-dotted rounded-md bg-bg-grey flex justify-center items-center flex-col">
                        <div className=''>
                            <img
                                src={UPWARD_ARROW}
                            />
                        </div>

                        <div
                            className='text-sm font-bold mt-2 text-grey-dark'
                        >Click or drag file(s) here to upload</div>

                    </div>
                    <div className="text-xs text-color-grey-light mt-2">
                        Upload a .env file. It should not be greater than 5KB.
                    </div>
                </div>
            }

        </div>
    )
};

export default EnvironmentDrawer;