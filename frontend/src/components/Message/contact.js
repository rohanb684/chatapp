import styles from './Message.module.css'
// import { defaultProfilePicture } from '../../constant/constant'
import { useAccountContext } from '../../context/AccountContext';
import { renderMessageContent } from '../../utils/common-utils';


export default function Contact({message}){

    const {currentPerson} = useAccountContext();

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
        <div className={styles.messageContainer}>
            <div className={styles.profileImage} style={{ backgroundImage : `url(${currentPerson.picture})`}}></div>
            <div className={styles.messageCard}>
                <div className={styles.name}>
                    <h5>{currentPerson.name}</h5>
                </div>
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