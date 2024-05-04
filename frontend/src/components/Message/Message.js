import styles from './Message.module.css'
import { useEffect, useState } from 'react'

import { useAccountContext } from '../../context/AccountContext'
import { getMessage } from '../../service/Api'

import Contact from './contact'
import Owner from './owner'

export default function Message(){
    const{ currentChat , newMessage, user, incomingMessage} = useAccountContext();
    const [messages, setMessages] = useState();
  
    useEffect(()=>{
        console.log("messages useEffect called ");
             const fetchMessages = async() =>{
            const convoMessages = await getMessage({
                conversationId: currentChat
            });
            // console.log("messages");
            // console.log(convoMessages)
            setMessages(convoMessages);
        }

    
        fetchMessages();
    },[currentChat, newMessage, incomingMessage])
    
    
    return(
        <div className={styles.messageComponent}>
            {!messages || messages.length === 0 ? null : messages.map((message,index) => 
            (message.senderId === user.sub ? <Owner key={index} message={message} />
             : <Contact key={index} message={message} />))}
        </div>
        
    )
}