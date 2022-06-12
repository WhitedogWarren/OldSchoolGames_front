import { useEffect } from 'react';

import useIoSocket from '../../../../hooks/useIoSocket';
import { ioManagment } from './ioMessageManagment';

import './IoMessageBox.scss';

function IoMessageBox() {
    const { Socket } = useIoSocket();

    useEffect(() => {
        ioManagment(Socket);
        return () => {
            Socket.off('connexion_acknowledgement');
            Socket.off('socketNamed');
            Socket.off('message');
            Socket.off('newUser');
            Socket.off('userLeft');
            Socket.off('invitedBy');
        }
    }, [])
    
    return (
        <div className="IoMessageBox">
            <p className="IoMessageBox__heading">IoMessageBox</p>
            <div className="io-inbox">
            </div>
        </div>
    )
}

export default IoMessageBox;