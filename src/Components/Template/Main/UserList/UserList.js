import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useIoSocket from "../../../../hooks/useIoSocket";
import { ioManagment } from "./ioUserListManagment";
import UserListItem from "./../UserListItem/UserListItem";

function UserList() {
    const { authStatus } = useAuth();
    const { Socket } = useIoSocket();
    const [userList, updateUserList] = useState([]);
    ioManagment(Socket, updateUserList);
    const displayedUsers = userList.filter(user => user !== authStatus.user.pseudo);

    return (
        <div className="Userlist">
            <div className="Userlist__heading">
                userList
            </div> 
            {displayedUsers.map((user) => (<UserListItem user={user} key={`${user}-listItem`} />))}
        </div>
    )
}

export default UserList;