import Button from "../components/Button";
import Header from "../components/Header";
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchContext, DiaryStateContext, GoogleLoginStateContext} from "../App";
import {getMonthRangeByDate, getUserHistory} from "../util";
import DiaryList from "../components/DiaryList";
import GoogleLoginButton from "../components/login/GoogleLoginButton";
import { jwtDecode } from "jwt-decode";
import NewsTrendChart from "../components/news/newsComponents/NewsTrendChart";
import SentimentTrendChart from "../components/news/newsComponents/SentimentTrendChart";
import NewsTrendContent from "../components/news/NewsTrendContent";

const Home = () => {

    const data = useContext(DiaryStateContext);
    const authState = useContext(GoogleLoginStateContext);
    const { showGoogleLogin } = authState;

    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());

    const headerTitle = `${pivotDate.getFullYear()}년 
                         ${pivotDate.getMonth() + 1}월`;

    useEffect(() => {
       if (data.length >= 1) {
           const  {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
           setFilteredData(
               data.filter(
                   (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
               )
           );
       } else {
           setFilteredData([]);
       }
    }, [data, pivotDate]);

    const onIncreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() + 1));
    };
    const onDecreaseMonth = () => {
        setPivotDate(new Date(pivotDate.getFullYear(), pivotDate.getMonth() - 1));
    };

    return (
        <div>
           <Header
            title={headerTitle}
            leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
            rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
           />
           { showGoogleLogin ? <NewsTrendContent /> : <DiaryList data={filteredData} /> }
        </div>
    );
};

export default Home;