import "./Header.css";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';

import GoogleLoginButton from "./login/GoogleLoginButton";
import {useContext} from "react";
import {DiaryDispatchContext, GoogleLoginStateContext} from "../App";
import {jwtDecode} from "jwt-decode";
import {getUserHistory} from "../util";

const Header = ({ title, leftChild, rightChild }) => {

    const { onInit, onCreate } = useContext(DiaryDispatchContext);
    const authState = useContext(GoogleLoginStateContext);
    const { showGoogleLogin, setShowGoogleLogin } = authState;
    const onLogin = async (credential) => {
        const decoded = jwtDecode(credential);

        setShowGoogleLogin(false);

        try {
            var userHistory = await getUserHistory(decoded.email);

            userHistory.forEach( (doc) => {
                console.log(`${doc.id} => ${doc.data()['content']}`);
                onCreate(doc.data().date, doc.data().content, doc.data().sentiment, '');
            });

        } catch (error) {
            console.error("Error getting user history: ", error);
        }
    };

    const onLogout = () => {
        setShowGoogleLogin(true);
        onInit();
    }

    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">{rightChild}</div>
            {showGoogleLogin && <GoogleLoginButton onLogin={onLogin} />}
            {!showGoogleLogin && <LogoutIcon className="login_flag" onClick={onLogout} />}
        </div>
    );
};
export default Header;
