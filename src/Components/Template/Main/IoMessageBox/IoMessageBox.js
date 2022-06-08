import useIoSocket from '../../../../hooks/useIoSocket';
import { ioManagment } from './ioMessageManagment';

import './IoMessageBox.scss';

function IoMessageBox() {
    const { Socket } = useIoSocket();
    ioManagment(Socket);
    
    return (
        <div className="IoMessageBox">
            <p className="IoMessageBox__heading">IoMessageBox</p>
            <div className="io-inbox">
            </div>
        </div>
    )
}

export default IoMessageBox;