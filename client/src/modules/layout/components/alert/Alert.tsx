import { useSelector } from 'react-redux'
import { AlertState } from '../../../../redux/user/alertSlice';

const Alert = () => {
    const alerts = useSelector((state: { alerts: AlertState }) => state.alerts.alerts)
    const status = alerts.length > 0 && alerts[0].status && alerts[0].status;

    const alertBgColor = () => {
        let  bgColor;
        switch (status) {
            case 'success': bgColor ='bg-green-500';
                break;
            case 'error': bgColor = 'bg-red-500'
            break;
            default: return 'bg-white'
        }
        return bgColor
    }

    return (
        <>
            {
                alerts.length > 0 && (
                    <div className={`animate-refine-slide fixed top-5 left-5 right-5 z-1050 rounded p-4 ${alertBgColor()}`}>
                        <div key={alerts[0].id}>
                         <span className="text-white">{alerts[0].message }</span>
                        </div>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-white" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                            </svg>
                        </span>
                    </div>

                )
            }
        </>
    );
}

export default Alert
