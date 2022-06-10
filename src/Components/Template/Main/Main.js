import { useEffect } from 'react';
import useIoSocket from '../../../hooks/useIoSocket';
import { Outlet } from 'react-router-dom';


import './Main.scss';
// import IoMessageBox from './IoMessageBox/IoMessageBox';
// import UserList from './UserList/UserList';

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
                <Outlet />
        </div>
    );
}

export default Main;