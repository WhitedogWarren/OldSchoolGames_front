import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuth from "../../../../hooks/useAuth";
import useIoSocket from "../../../../hooks/useIoSocket";
import useMorpion from "../../../../hooks/useMorpion";
import { ioManagment } from "./ioUserListManagment";

import UserListItem from "./../UserListItem/UserListItem";

import './UserList.scss';

function UserList() {
    const { authStatus } = useAuth();
    const { Socket } = useIoSocket();
    const { setPlayers } = useMorpion();
    const [userList, updateUserList] = useState([]);
    const [invites, updateInvites] = useState({invited: [], invitedBy: []});
    const navigate = useNavigate();
    const displayedUsers = userList.filter(user => user !== authStatus.user.pseudo);
    useEffect(() => {
        ioManagment(Socket, authStatus.user.pseudo, updateUserList, updateInvites, navigate, setPlayers);
        return () => {
            Socket.off('socketNamed');
            Socket.off('newUser');
            Socket.off('userLeft');
            Socket.off('invitesList');
            Socket.off('morpionStarts');
        }
    }, [])
    
    return (
        <div className="Userlist">
            <div className="Userlist__heading">
                userList
            </div> 
            {displayedUsers.map((user) => (<UserListItem
                user={user}
                key={`${user}-listItem`}
                invites={invites}
            />))}
        </div>
    )
}

export default UserList;