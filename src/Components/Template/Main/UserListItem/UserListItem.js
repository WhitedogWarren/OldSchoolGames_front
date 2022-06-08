import useIoSocket from '../../../../hooks/useIoSocket';

import './UserListItem.css';

function UserListItem(props) {
    const { Socket } = useIoSocket();
    function sendInvite(user) {
        Socket.emit('invite', user);
    }
    
    return (
        <p className="UserListItem" onClick={() =>sendInvite(props.user)}>{props.user}</p>
    )
}

export default UserListItem;