import { useEffect, useState } from 'react';
import useLocalStorage from '../../../hooks/useLocalStorage';
import DOWNLOAD_ICON from '../../../assets/icons/DOWNLOAD_ICON.svg';
import UPLOAD_ICON from '../../../assets/icons/UPLOAD_ICON.svg';
import DELETE_ICON from '../../../assets/icons/DELETE_ICON.svg';
import EnvironmentDrawer from '../../EnvironmentDrawer';


const EnvironmentVariable = () => {
    const [envVariables, setEnv] = useState([]);
    const [envModalVisible, setEnvModal] = useState(false);
    const [getData, setData] = useLocalStorage('envData', '');
    useEffect(() => {
        setSavedData();
    }, [])

    const setSavedData = () => {
        try {
            const savedData: any = getData();
            if (savedData) {
                setEnv(JSON.parse(savedData))
            }
        } catch (error) { }
    }
    const handleUploadClick = () => {
        setEnvModal(true);
    }
    const closeEnvModal = () => {
        setEnvModal(false);
    };
    const handleDownloadClick = () => {
        function downloadEnvFile(content: any, fileName: any) {
            const blob = new Blob([content], { type: "text/plain" });
            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = fileName;
            a.click();
            URL.revokeObjectURL(a.href);
        }
        function convertToEnvFileContent(array: any) {
            return array.map((item: any) => `${item.key}=${item.value}`).join('\n');
        }
        if (Object.keys(envVariables).length > 0) {
            downloadEnvFile(convertToEnvFileContent(envVariables), "config.env");
        }
    };
    const handleDeleteClick = (obj: any) => {
        const updatedEntries = envVariables.filter((curr: any) => curr.key != obj.key);
        setEnv([...updatedEntries]);
        convertJsonToStringAndSet(updatedEntries);
    };

    const handleAddCbc = (envLst: any) => {
        if (Object.keys(envLst).length > 0) {
            const updatedEntries = [...envVariables, ...Object.entries(envLst).map(([key, value]) => ({
                key: key,
                value: value
            }))]
            setEnv([...updatedEntries]);
            convertJsonToStringAndSet(updatedEntries);
        }
    }
    const convertJsonToStringAndSet = (data: any) => {
        try {
            setData(JSON.stringify(data));
        } catch (error) { }
    }
    return (
        <>
            <div className="p-5 bg-green mt-5 bg-white border rounded-md min-h-96 overflow-hidden">
                <div className='flex justify-between'>
                    <div className='text-color-grey-light text-base font-semibold'>
                        Environment Variable
                    </div>
                    <div className='flex'>
                        <img
                            src={UPLOAD_ICON}
                            className='p-1 cursor-pointer'
                            onClick={handleUploadClick}
                        />
                        <img
                            src={DOWNLOAD_ICON}
                            className='p-1 cursor-pointer'
                            onClick={handleDownloadClick}
                        />
                    </div>
                </div>
                <div className='mt-3'>
                    {
                        !(envVariables && envVariables.length > 0)
                            ? <div className='text-color-grey-light text-sm font-medium'>{'No environment variable created.'}</div>
                            :
                            <div className=''>
                                {envVariables && envVariables.length > 0
                                    && envVariables.map((currEnv) => {
                                        const { key, value } = currEnv
                                        return (
                                            <div className='flex align-middle w-96 justify-between border rounded-lg px-4 py-2 m-2'>
                                                <div className='text-black font-medium text-sm'>{key}</div>
                                                <div className='text-color-grey-light font-medium text-sm'>{value}</div>
                                                <div>
                                                    <img
                                                        src={DELETE_ICON}
                                                        className='p-1 cursor-pointer'
                                                        onClick={() => handleDeleteClick(currEnv)}
                                                    />
                                                </div>
                                            </div>)
                                    })}
                            </div>
                    }
                </div>
            </div>
            {envModalVisible && <EnvironmentDrawer closeModal={closeEnvModal} handleAddEnvs={handleAddCbc} />}
        </>
    )
}

export default EnvironmentVariable;