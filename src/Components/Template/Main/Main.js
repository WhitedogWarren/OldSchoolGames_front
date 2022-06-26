import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import MorpionGameProvider from '../../../Providers/MorpionGameProvider';
import useIoSocket from '../../../hooks/useIoSocket';

import './Main.scss';

function Main() {
    const { ioClose } = useIoSocket();
    useEffect(() => {

        return () => {
            // before the component is destroyed
            // unbind all event handlers used in this component
            ioClose();
        };
    }, [ioClose]);
    
    return (
        <div className="Main">
            <MorpionGameProvider>
                <Outlet />
            </MorpionGameProvider>    
        </div>
    );
}

export default Main;