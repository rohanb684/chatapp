import { webLogo } from "../../images/svg/webLogo";
import styles from './Default.module.css';

export default function Default(){
    return(
        <div className={styles.defaultScreen}>
                       <span data-icon="intro-md-beta-logo-light" class="_al_o" dangerouslySetInnerHTML={{ __html: webLogo }}></span>
                       <div className="webText">
                        <h1>WhatsApp Web</h1>
                       </div>
                       <div className={styles.webPara}>
                        <p>Send and receive messages without keeping your phone online.</p>
                        <p>Use WhatsApp on up to 4 linked devices and 1 phone at the same time.</p>
                       </div>
                    </div> 
    )
}