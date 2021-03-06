import useIoSocket from '../../../../hooks/useIoSocket';

import './UserListItem.css';

function UserListItem(props) {
    const { Socket } = useIoSocket();
    
    function handleInvites(user) {
        if(props.invites.invited.includes(user)) {
            console.log('déjà invité');
            //////
            // TODO : display message
            //////
        }
        if(props.invites.invitedBy.includes(user)) {
            Socket.emit('setGame', user);
        }
        if(!props.invites.invited.includes(user) && !props.invites.invitedBy.includes(user)) {
            Socket.emit('invite', user);
        }
    }
    
    return (
        <p
            className="UserListItem"
            onClick={() =>handleInvites(props.user)}
        >
        {props.user}
        {
            props.invites.invited.includes(props.user) && <img src="./../../../../../images/icons/sablier.gif" alt="waiting"/>
        }
        {
            props.invites.invitedBy.includes(props.user) && <img src="./../../../../../images/icons/coucou.gif" alt="invited you"/>
        }
        </p>
    )
}

export default UserListItem;