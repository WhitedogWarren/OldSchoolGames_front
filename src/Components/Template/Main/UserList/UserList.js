import { useState } from "react";
import useAuth from "../../../../hooks/useAuth";
import useIoSocket from "../../../../hooks/useIoSocket";
import { ioManagment } from "./ioUserListManagment"

function UserList() {
    const { authStatus } = useAuth();
    const { Socket } = useIoSocket();
    const [userList, updateUserList] = useState([]);
    ioManagment(Socket, updateUserList);
    

    return (
        <div>
            userList works<br/>
            {userList.filter(user => user !== authStatus.user.pseudo)}
        </div>
    )
}

export default UserList;