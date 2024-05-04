import Login from "../Login/Login";
import LoginNav from "../../components/LoginNav/LoginNav";
import Home from "../Home/Home";
import { useAccountContext } from "../../context/AccountContext";

export default function Container(){
    const {user} = useAccountContext();
    // console.log(user);
    
    return (
        <>
        {!user ? (
            <>
                <LoginNav/>
                <Login/>
            </>
        ) : (
            <Home/>
        )}
        </>
    );
    
}