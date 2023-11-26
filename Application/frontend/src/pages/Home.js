import Button from "../components/Button";
import Header from "../components/Header";
import {useContext, useEffect, useState} from "react";
import {DiaryDispatchContext, DiaryStateContext} from "../App";
import {getMonthRangeByDate, getUserHistory} from "../util";
import DiaryList from "../components/DiaryList";
import GoogleLoginButton from "../components/login/GoogleLoginButton";
import { jwtDecode } from "jwt-decode";

const Home = () => {

    const data = useContext(DiaryStateContext);
    const { onCreate } = useContext(DiaryDispatchContext);

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

    const [showGoogleLogin, setShowGoogleLogin] = useState(true);
    const onLogin = async (credential) => {
        const decoded = jwtDecode(credential);

        setShowGoogleLogin(false);

        // onCreate(date, content, emotionId, fetchDataList);

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

    return (
        <div>
           {showGoogleLogin && <GoogleLoginButton onLogin={onLogin} />}
           <Header
            title={headerTitle}
            leftChild={<Button text={"<"} onClick={onDecreaseMonth} />}
            rightChild={<Button text={">"} onClick={onIncreaseMonth} />}
            onLogin={onLogin}
           />
           <DiaryList data={filteredData} />
        </div>
    );
};

export default Home;
