exports.ioManagment = (socket, updateUserList, updateInvites) => {
    socket.on('socketNamed', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('newUser', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('userLeft', data => {
        data = JSON.parse(data);
        updateUserList(data.userList);
    })
    socket.on('invitesList', invites => {
        updateInvites(JSON.parse(invites));
    })
}