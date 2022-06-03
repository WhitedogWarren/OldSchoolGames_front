import useAuth from "../../../hooks/useAuth";

import './Main.css';
import IoBox from '../IoBox/IoBox';

function Main() {
    const { authStatus } = useAuth();
    return (
        <div className="Main">
            
            <IoBox />
        </div>
    );
}

export default Main;