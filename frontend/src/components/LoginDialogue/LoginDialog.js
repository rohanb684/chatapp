import { qrCodeImage } from '../../constant/constant.js';

import  styles from './LoginDialog.module.css'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

import {addNewUser} from '../../service/Api.js'

import { useAccountContext } from "../../context/AccountContext.js";


export default function LoginDialog(){
    const {setUser} = useAccountContext();

    const onLoginSuccess = (res) =>{
        const decoded = jwtDecode(res.credential);
        setUser(decoded);
        addNewUser(decoded);
        // console.log(decoded)
    }

    const onLoginError = (res)=>{
        console.log(res)
    }

    return(
      <div className={styles.dialog}>
        <div className={styles.dialogLeft}>
            <h2>Use WhatsApp on your computer:</h2>
            <ol>
                <li>Open WhatsApp on your phone</li>
                <li>Tap Menu Settings and select WhatsApp Web</li>
                <li>Point your phone to this screen to capture the code</li>
            </ol>
        </div>
        <div className={styles.dialogRight}>
            <div className={styles.qrCode}>
                <img src={qrCodeImage} alt="qrImage" />
                <div className={styles.googleAuth}>
                    <GoogleLogin
                        onSuccess={onLoginSuccess}
                        onError={onLoginError}
                    />
                </div>
            </div>
        </div>
      </div>
    )
}
