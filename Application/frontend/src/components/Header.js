import "./Header.css";
import LoginIcon from "@mui/icons-material/Login";

const Header = ({ title, leftChild, rightChild, onLogin }) => {
    return (
        <div className="Header">
            <div className="header_left">{leftChild}</div>
            <div className="header_title">{title}</div>
            <div className="header_right">{rightChild}</div>
        </div>
    );
};
export default Header;
