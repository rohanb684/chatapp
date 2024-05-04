import styles from './Profile.module.css';
import { IoArrowBackOutline } from "react-icons/io5";
import { useAccountContext } from '../../context/AccountContext';


export default function Profile (props){
    const {isProfileOpen, setIsProfileOpen} = props;
    const {user} = useAccountContext();
    
    return(
        <div className={isProfileOpen ? styles.profile : styles.hideProfile}>
            <div className={styles.profileTop}>
                <IoArrowBackOutline  onClick={()=>setIsProfileOpen()}  className={styles.backIcon} />
                <h5>Profile</h5>
            </div>

            {/* Profile Picutre */}
            <div className={styles.imageSection}>
                <div className={isProfileOpen ?  styles.profileImage : styles.hideContent}
                    style={{ backgroundImage : `url(${user.picture})`}}>
                </div>
            </div>

            <div className={ isProfileOpen ? styles.nameSection :styles.hideContent}>
                <div className={styles.nameTop}>
                    <p>Your Name</p>
                </div>
                <div className={styles.nameBottom}>
                    <h3>{user.given_name}</h3>
                </div>
            </div>

            <div className={ isProfileOpen ? styles.nameMsg :styles.hideContent}>
                <p>This is not your username or PIN. This name will be visible to your WhatsApp contacts.</p>
            </div>

            <div className={ isProfileOpen ? styles.aboutSection :styles.hideContent}>
            <div className={styles.abTop}>
                    <p>About</p>
                </div>
                <div className={styles.abBottom}>
                    <h3>Lorem ipsum dolor sit, amet consectetur adipisicing elit.asasasassasas asas afsfsd fswdqsd</h3>
                </div>
            </div>
    
        </div>
    )
}