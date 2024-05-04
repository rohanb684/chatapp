import styles from './Right.module.css'
import { useAccountContext } from '../../context/AccountContext';
import { getMessage } from '../../service/Api';

import { FaSearch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { IoCloseCircleSharp } from "react-icons/io5";

import { useState } from 'react';

import Message from '../Message/Message';
import Footer from '../Message/Footer';

export default function Right(){
    const { currentPerson, activeUsers  } = useAccountContext();

    const [filterMessage, setFilterMessage] = useState(false);

    
    const toggleInput = () =>{
        setFilterMessage(!filterMessage);
    }

    return(
        <div className={styles.homeRight}>
        <div className={styles.rightTop}>
            <div className={styles.topLeft}>
                    <div className={styles.image} style={{backgroundImage:`url(${currentPerson.picture})`}}>

                    </div>
                    <div className={styles.desc}>
                        <div className={styles.name}>
                            <h4>{currentPerson.name}</h4>
                        </div>
                        <div className={styles.status}>
                            <p>{activeUsers?.find(user => user.sub === currentPerson.sub) ? 'Online' : 'Offline'}</p>
                        </div>
                    </div>
            </div>
            <div className={styles.topRight}>
                {filterMessage && <div className={styles.filterMsg}>
                    <form action="">
                        <input type="text" />
                    </form>
                </div>}
                <div className={styles.searchChat} onClick={toggleInput}>
                    {!filterMessage ? <FaSearch /> :<IoCloseCircleSharp />}
                </div>
                <div className={styles.menu}>
                {<CiMenuKebab/>}
                </div>
            </div>
        </div>
        <div className={styles.messages}>
            <Message/>
        </div>
        <div className={styles.rightFooter}>
            <Footer/>
        </div>
        </div>
    )
}