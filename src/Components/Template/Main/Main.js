import { useEffect } from 'react';
import useIoSocket from '../../../hooks/useIoSocket';

import './Main.css';
import IoMessageBox from './IoMessageBox/IoMessageBox';
import UserList from './UserList/UserList';

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
                <UserList />
                <IoMessageBox />
        </div>
    );
}

export default Main;