import Dropdown from 'react-bootstrap/Dropdown'; 
import styles from './Home.module.css';
import { useEffect, useState } from "react";
import { useAccountContext } from "../../context/AccountContext";

import { FaCircleNotch } from "react-icons/fa";
import { CiMenuKebab } from "react-icons/ci";
import { MdChat } from "react-icons/md";
import { MdMarkUnreadChatAlt } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

import { getUsers } from "../../service/Api";

import ChatCard from "../../components/Card/ChatCard";
import Profile from "../../components/Profile/Profile";
import Default from "../../components/DefaultHomeScreen/Default";
import Right from '../../components/HomeRight/Right';

export default function Home(){
    const newChat = null;
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const {user, currentChat} = useAccountContext();
    const [users, setUsers] = useState([]);
    const [text, setText] = useState('');

    

    useEffect(()=>{
        const fetchData = async() =>{
            const data= await getUsers();
            const filterValue = text.trim();
            if(filterValue){
                let fiteredData = data.filter(user => user.name.toLowerCase().includes(filterValue.toLowerCase()));
                 setUsers(fiteredData);
            }else{
                setUsers(data);
            }
        }

        fetchData();
    },[text])

    const toggleProfileSection = () =>{
        setIsProfileOpen(!isProfileOpen);   
    }
    

    return(
        <div className={styles.homeContainer}>

            <div className={isProfileOpen ? styles.showProfile : styles.hideProfile} > <Profile setIsProfileOpen={setIsProfileOpen}  isProfileOpen={isProfileOpen}/> </div>
            
            {/* <div className={!isProfileOpen ? styles.homeLeft : styles.homeLeftHidden}> */}
            <div className={styles.homeLeft}>
                <div className={styles.leftTop}>
                    <div className={styles.profileImage} style={{cursor: 'pointer', backgroundImage : `url(${user.picture})`}}
                        onClick={toggleProfileSection} >
                        
                    </div>
                    <div className={styles.leftTopRight}>
                        <div className={styles.nonBootstrap}>
                        <FaCircleNotch style={{cursor: 'pointer'}}  />
                        {newChat ? <MdMarkUnreadChatAlt style={{cursor: 'pointer'}} /> : <MdChat style={{cursor: 'pointer'}} />}
                        </div>
                        
                    <div className="menuDropdown">
                    <Dropdown > 
                        <Dropdown.Toggle variant="transparent" id="dropdown-custom">  
                        <CiMenuKebab style={{fontSize:'1.5rem'}}    />
                        </Dropdown.Toggle> 
                        <Dropdown.Menu> 
                        <Dropdown.Item onClick={toggleProfileSection} > 
                            My Account
                        </Dropdown.Item> 
                        <Dropdown.Item href="#"> 
                            Settings 
                        </Dropdown.Item> 
                        <Dropdown.Item href="#"> 
                            Logout  
                        </Dropdown.Item> 
                        </Dropdown.Menu> 
                    </Dropdown> 
                    </div>    
                    </div>
                </div>
                <div className={styles.leftMid}>
                    <div className={styles.searchBar}>
                        <div className="searchIcon">
                        <FaSearch />
                        </div>
                        <form action="" className={styles.inputForm}>
                            <input  type="text" name="searchPerson"  placeholder="Search Contact"
                                onChange={(e)=> setText(e.target.value)}/>
                        </form>
                    </div>
                </div>
                <div className="chats">
                    {users.map((val, index)=>(
                        <ChatCard value={val} key={index} />
                    ))}
                </div>
            </div>
            <div className={styles.homeRight}>
            {/* default screen after loggin in */}
                {currentChat ? <Right/> : <Default/>}
            </div>
        </div>
    )
}