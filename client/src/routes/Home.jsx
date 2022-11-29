import { useContext } from "react";
import { UserContext } from "../UserContext";

const HomePage = (props) => {

    const userData = useContext(UserContext);
    console.log(userData);
    return (
        <div>
            <h1 style={{color: 'white'}}>{userData.username}</h1>
        </div>
    )
}

export { HomePage };