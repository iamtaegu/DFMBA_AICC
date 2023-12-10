import "./Header.css";

import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';

import GoogleLoginButton from "./login/GoogleLoginButton";
import {useContext} from "react";
import {DiaryDispatchContext, GoogleLoginStateContext} from "../App";
import {jwtDecode} from "jwt-decode";
import {getUserHistory} from "../util";

const Header = ({ title, leftChild, rightChild, setPivotDate}) => {

    const { onInit, onCreate } = useContext(DiaryDispatchContext);
    const authState = useContext(GoogleLoginStateContext);
    const { showGoogleLogin, setShowGoogleLogin, setGoogleLoginId } = authState;
    const onLogin = async (credential) => {
        const decoded = jwtDecode(credential);

        setShowGoogleLogin(false);
        setGoogleLoginId(decoded.email);
        setPivotDate(new Date()); //로그인 이후 년월 설정

        try {
            var userHistory = await getUserHistory(decoded.email);

            userHistory.forEach( (doc) => {
                onCreate(doc.id, doc.date, doc.content, doc.emotionId, doc.fetchDataList);
            });

        } catch (error) {
            console.error("Error getting user history: ", error);
        }
    };

    const onLogout = () => {
        onInit();
    }

    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">{rightChild}</div>
            {showGoogleLogin && <GoogleLoginButton className="login_flag" onLogin={onLogin} />}
            {!showGoogleLogin && <LogoutIcon className="login_flag" onClick={onLogout} />}
        </div>
    );
};
export default Header;
