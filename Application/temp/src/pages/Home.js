import { useSearchParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import Editor from "../components/Editor";
import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import {getMonthRangeByDate} from "../util";
import DiaryList from "../components/DiaryList";

const Home = () => {
    const data = useContext(DiaryStateContext);
    const [filteredData, setFilteredData] = useState([]);
    const [pivotDate, setPivotDate] = useState(new Date());
    const headerTitle = `${pivotDate.getFullYear()}년 
                         ${pivotDate.getMonth() + 1}월`;

    useEffect(() => {
       if (data.length >= 1) {
           // 아래 형태로 기간조회 기능 구현 가능 (2023.10.01:HH:MM:SS ~ 2023.11.00:23:59:59)
           /*const  {beginTimeStamp, endTimeStamp} = getMonthRangeByDate(pivotDate);
           setFilteredData(
               data.filter(
                   (it) => beginTimeStamp <= it.date && it.date <= endTimeStamp
               )
           );*/
           setFilteredData(data);
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
           <DiaryList data={filteredData} />
        </div>
    );
};

export default Home;
