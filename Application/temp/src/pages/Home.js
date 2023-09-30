import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";

const Home = () => {
    return (
        <div>
           <Editor onSubmit={() => {
               alert("작성 완료 버튼 클릭");
           }}
           />
        </div>
    );
};

export default Home;
