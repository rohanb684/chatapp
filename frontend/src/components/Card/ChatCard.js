import styles from './ChatCard.module.css';
import { useAccountContext } from '../../context/AccountContext';
import { useEffect, useState } from 'react';
import { setConversations } from '../../service/Api';
import { getConversation } from '../../service/Api';

export default function ChatCard(props){
    const {name, picture, sub} = props.value
    console.log("chat card sub: " + sub);
    let  formattedTime;
    const timeOptions = { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true
    };
    // const{setIsChatOpen} = props;

    const [lastMessage, setLastMessage] = useState();
    const [conversationId, setConversationId] = useState();

    const {setCurrentChat, user, newMessage, setCurrentPerson, 
        currentChat, socket, setActiveUsers,
        incomingMessage, setIncomingMessage} = useAccountContext();

    useEffect(()=>{
        console.log("set new Conversation")
        // console.log(sub + " " + user.sub)
        // console.log(lastMessage);
        const setNewConversation = async()=>{
            await setConversations({
                senderId : sub,
                receiverId : user.sub,
                message:''
            })
        }
        setNewConversation();
    },[sub]);


    useEffect(()=>{
        
        const fetchConversation = async()=>{
            // console.log(sub + " " + user.sub)
            console.log("getConversation")
            const data =  await getConversation({
                    senderId : sub,
                    receiverId : user.sub
                })

                // console.log("data: "+ data._id);
                console.log("getConversation")
                console.log(data);

             if(data){
            setConversationId(data._id);
                 }
        

              if(data){
            setLastMessage(data);
              }
        } 
        // console.log(lastMessage);
        fetchConversation();
    },[newMessage, incomingMessage]);

    useEffect(()=>{
        // console.log("socket useEffect")
        socket.current.emit('addUser', user);
        socket.current.on('getUser', users =>{
            setActiveUsers(users);
        })
    },[user])

    useEffect(()=>{
        socket.current.on('getMessage', data =>{
            setIncomingMessage(data);
        })
    },[])

    function getTime() {
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        if(lastMessage && lastMessage.message && lastMessage.updatedAt){
            console.log(lastMessage);
            const date = new Date(lastMessage.updatedAt);
            const formattedTime = date.toLocaleTimeString('en-US', timeOptions);
            return formattedTime;
        }
      }

    let lastMessageTime = getTime();
    const handleChatClick = () =>{
        // console.log("chat card handle click")
        // console.log(conversationId);
        // console.log(name + ": sub in chat card: " + sub);
        setCurrentChat(conversationId);
        setCurrentPerson(props.value);
    }
    
    const toggleBackGround = conversationId && currentChat && conversationId === currentChat ? styles.greyCardContainer : styles.cardContainer
    
    
    // 'rgb(212, 205, 205)' : 'white';

    return(
        <div className={toggleBackGround}  onClick={handleChatClick}>
            <div className={styles.cardImage} style={{backgroundImage:`url(${picture})`}}>

            </div>
            <div className={styles.cardMid}>
                <div className={styles.contactName}>
                    {user.sub === sub ? <h5>{name}(You)</h5> :<h5>{name}</h5>  }
                </div>
                <div className={styles.lastMessage}>
                    <p>{lastMessage? lastMessage.message :null}</p>
                </div>
            </div>
            <div className={styles.lastMessageTime}>
                    <p>{lastMessageTime }</p>
                </div>
        </div>
    )
}