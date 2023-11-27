import {GoogleLogin} from "@react-oauth/google";
import {GoogleOAuthProvider} from "@react-oauth/google";
import LoginIcon from "@mui/icons-material/Login";

const GOOGLE_ID: string = process.env.REACT_APP_GOOGLE_ID as string;

// @ts-ignore
const GoogleLoginButton = ({onLogin}) => {
    return (
        <LoginIcon>
            <GoogleOAuthProvider clientId={GOOGLE_ID}>
                <GoogleLogin
                    onSuccess={(res) => {
                        onLogin(res.credential);
                    }}
                />
            </GoogleOAuthProvider>
        </LoginIcon>
    );
};

export default GoogleLoginButton