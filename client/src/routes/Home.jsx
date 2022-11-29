import { useContext } from "react";
import { UserContext } from "../UserContext";

const HomePage = (props) => {

    const { userData, setLoggedIn } = useContext(UserContext);
    console.log(userData);

    const logout = () => {
        setLoggedIn(false);
    };

    return (
        <div>
            <h1 style={{color: 'white'}}>Hello, {userData}!</h1>
            <button onClick={logout}> Log Out </button>
        </div>
    )
}

export { HomePage };