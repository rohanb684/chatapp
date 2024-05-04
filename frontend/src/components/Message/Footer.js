import {  useRef } from 'react';
import styles from './Message.module.css';

import { useAccountContext } from '../../context/AccountContext';
import { addMessage, uploadFile } from '../../service/Api';
import { setConversations } from '../../service/Api';

import { GrAttachment } from "react-icons/gr";
import { MdSend } from "react-icons/md";

export default function Footer(){
    
    const {user, currentPerson, currentChat, setNewMesssage, file, setFile, socket} = useAccountContext();
    
    const inputRef = useRef();

    // useEffect(()=>{
    //     const getImage = async () =>{
    //         if(file){
    //             const data = new FormData();
    //             data.append("name", file.name);
    //             data.append("file", file);

    //             await uploadFile(data);
    //         }
    //     }

    //     getImage();
    // }, [file])

    const onFileChange = (e) =>{
        inputRef.current.value = e.target.files[0].name;
        setFile(e.target.files[0]);
        
    }
  

    const handlSendMessage = async() =>{
        const inputValue = inputRef.current.value.trim();

        if(!inputValue){
            return;
        }
        let newMessage;

        if(!file){
            newMessage = {
                conversationId: currentChat,
                senderId: user.sub,
                receiverId: currentPerson.sub,
                text:inputValue,
                type:"text"
            }
        }else{
            const data = new FormData();
            data.append("name", file.name);
            data.append("file", file);
            const response  = await uploadFile(data);
            
            newMessage = {
                conversationId: currentChat,
                senderId: user.sub,
                receiverId: currentPerson.sub,
                text:response.data,
                type:"file"
            }

        }
        socket.current.emit('sendMessage',newMessage);

        await addMessage(newMessage);
        await setConversations({
            senderId : currentPerson.sub,
            receiverId : user.sub,
            message: inputValue
        })
        
        inputRef.current.value = '';
        setNewMesssage(newMessage.text);
    }

    return(
        <div className={styles.footer}>
            <div className={styles.attachment}>
                <label htmlFor="fileInput">
                <GrAttachment />
                </label>
                <input type="file" id='fileInput' 
                style={{display:'none'}}
                onChange={(e) => onFileChange(e)}
                 />
            </div>
            <div className={styles.messageInput}>
                <form action="">
                    <input type="text" ref={inputRef} placeholder='Type your message'/>
                </form>
            </div>
            <div className={styles.sendIcon} onClick={handlSendMessage}>
                <MdSend />
            </div>
        </div>
    )
}