import styles from './Message.module.css'



import {renderMessageContent } from '../../utils/common-utils';

export default function Owner({message}){
    // console.log(message);

        const date = new Date(message.createdAt);
        const timeOptions = { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true
        };
        const dateOptions = {
            month: 'long', 
            day: '2-digit', 
            year: 'numeric' 
        }

        const formattedDate = date.toLocaleDateString('en-US', dateOptions).replace(',', ' -');
        const formattedTime = date.toLocaleTimeString('en-US', timeOptions); 
   
    return(
        <div className={styles.messageContainerOwner}>
            <div className={styles.messageCardOwner}>
                { message.type === 'text' ? <div className={styles.message}>
                    <p>{message.text}</p>
                </div>
                :
                <div className={styles.fileMessage}>
                    {renderMessageContent(message)}
                </div>
                }
                <div className={styles.timestamp}>
                    <p>{formattedTime}, {formattedDate}</p>
                </div>
                
            </div>
        </div>
    )
}
