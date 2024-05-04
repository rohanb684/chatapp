import { useContext, createContext, useState, useRef, useEffect } from "react";
import {io} from 'socket.io-client';

const accountContext = createContext();


const useAccountContext = () =>{
    const value = useContext(accountContext);
    return value;
}

const AccountProvider = ({children}) =>{
    const [user, setUser] = useState();
    const [currentChat, setCurrentChat] = useState();
    const [newMessage, setNewMesssage] = useState();
    const [currentPerson, setCurrentPerson] = useState();
    const [file, setFile] = useState();
    const [activeUsers, setActiveUsers] = useState();
    const [incomingMessage, setIncomingMessage]  = useState();

    const socket = useRef();

    useEffect(()=>{
        socket.current = io('ws://localhost:9000');
    })

    const value = {
        user, setUser, currentChat, setCurrentChat, newMessage , setNewMesssage,
        currentPerson, setCurrentPerson, file, setFile, socket, activeUsers, setActiveUsers,
        incomingMessage, setIncomingMessage
    }

    return (
        <accountContext.Provider value={value}>
            {children}
        </accountContext.Provider>
    )
}

export default AccountProvider;
export {useAccountContext};

