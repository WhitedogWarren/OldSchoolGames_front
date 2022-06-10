import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";
import useIoSocket from "../../../../hooks/useIoSocket";
import { ioManagment } from "./ioUserListManagment";
import UserListItem from "./../UserListItem/UserListItem";

function UserList() {
    const { authStatus } = useAuth();
    const { Socket } = useIoSocket();
    const [userList, updateUserList] = useState([]);
    const [invites, updateInvites] = useState({invited: [], invitedBy: []});
    const navigate = useNavigate();
    
    ioManagment(Socket, updateUserList, updateInvites, navigate);
    const displayedUsers = userList.filter(user => user !== authStatus.user.pseudo);
    //console.log('Invites : ', invites);

    
    
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