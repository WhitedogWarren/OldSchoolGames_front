exports.ioManagment = (socket, updateUserList) => {
    socket.on('newUser', data => {
        data = JSON.parse(data);
        console.log('newUser form userList');
        console.log(data.userList);
        updateUserList(data.userList);
    })
    socket.on('userLeft', data => {
        data = JSON.parse(data);
        console.log('userLeft form userList');
        console.log(data.userList);
        updateUserList(data.userList);
    })
}