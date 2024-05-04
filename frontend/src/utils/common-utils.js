import styles from '../components/Message/Message.module.css'
import { iconPDF } from '../constant/constant';
import { FaFileDownload } from "react-icons/fa";

export const downloadMedia = async (e, originalFile) => {
    e.preventDefault();
    try {
        fetch(originalFile)
        .then(resp => resp.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;

            const nameSplit = originalFile.split("/");
            const duplicateName = nameSplit.pop();

            // the filename you want
            a.download = "" + duplicateName + "";
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.log('Error while downloading the image ', error))

    } catch (error) {
        console.log('Error while downloading the image ', error);
    }
}


//for rendering message card content
export function renderMessageContent(message) {
    if (!message?.text) {
      return null;
    }
  
    const filename = message.text.split("/").pop();
    
    if (message.text.includes('.pdf')) {
      return (
        <div className={styles.pdf}>
          <img src={iconPDF} alt="pdf-icon" />
          <p>{filename}</p>
          <FaFileDownload className={styles.downloadIcon} onClick={(e) => downloadMedia(e, message.text)} />
        </div>
      );
    } else if (message.text.includes('.jpg') || message.text.includes('.jpeg') || message.text.includes('.png') || message.text.includes('.gif')) {
      return (
        <div className={styles.image} style={{backgroundImage: `url(${message.text})`}}>
            <img src={message.text}  alt='userImage'/>  
          <FaFileDownload className={styles.downloadIcon} onClick={(e) => downloadMedia(e, message.text)}/>
        </div>
      );
    } 
  
    // Add more conditions for other file types as needed
  
    return null; // Default return if no conditions are met
  }