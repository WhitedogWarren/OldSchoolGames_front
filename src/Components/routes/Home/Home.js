import IoMessageBox from "../../Template/Main/IoMessageBox/IoMessageBox";
import UserList from "../../Template/Main/UserList/UserList";

function Home() {
    return (
        <div className="Home">
            <UserList />
            <IoMessageBox />
        </div>
    )
}

export default Home;