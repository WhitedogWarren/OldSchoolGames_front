import useIoSocket from '../../../../hooks/useIoSocket';
import { ioManagment } from './ioMessageManagment';

function IoMessageBox() {
    const { Socket } = useIoSocket();
    ioManagment(Socket);
    
    return (
        <div>
            <p>IoBox works</p>
            <div className="io-inbox">
            </div>
        </div>
    )
}

export default IoMessageBox;