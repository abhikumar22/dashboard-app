const StatusChip = ({ text, status }) => {
    return (
        <td className="p-2  pl-10">
            {status === 'progress' &&
                <div className={`
             border
             w-max
             pr-2
             rounded-md
             border-progress
             text-sm
           bg-progress-light
           marker:text-progress list-outside list-disc
         `}>
                    <ul className='list-outside list-disc ml-5 flex justify-center items-center pl-1.5'>
                        <li className={`
                     text-xl p-0
                     `}>

                        </li>
                        {status && <span className={`text-progress`}>{text}</span>}
                    </ul>
                </div>
            }

            {status === 'failed' &&
                <div className={`
             border
             w-max
             pr-2
             rounded-md
             border-failed
             text-sm
           bg-failed-light
           marker:text-failed list-outside list-disc
         `}>
                    <ul className='list-outside list-disc ml-5 flex justify-center items-center pl-1.5'>
                        <li className={`
                     text-xl p-0
                     `}>

                        </li>
                        {status && <span className={`text-failed`}>{text}</span>}
                    </ul>
                </div>
            }

            {status === 'success' &&
                <div className={`
             border
             w-max
             pr-2
             rounded-md
             border-success
             text-sm
           bg-success-light
           marker:text-success list-outside list-disc
         `}>
                    <ul className='list-outside list-disc ml-5 flex justify-center items-center pl-1.5'>
                        <li className={`
                     text-xl p-0
                     `}>

                        </li>
                        {status && <span className={`text-success`}>{text}</span>}
                    </ul>
                </div>
            }

        </td>
    );
};

export default StatusChip;