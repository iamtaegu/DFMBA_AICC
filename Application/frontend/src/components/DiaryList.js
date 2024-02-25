import "./DiaryList.css";
import Button from "./Button";
import {useContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import DiaryItem from "./DiaryItem";
import {GoogleLoginStateContext} from "../App";


const sortOptionList = [
    {value:"latest", name:"최신순"},
    {value:"oldest", name:"오래된 순"},
];

const DiaryList = ({ data }) => {
    const [sortType, setSortType] = useState("latest");
    const [sortedData, setSortedData] = useState([]);
    const authState = useContext(GoogleLoginStateContext);
    const navigate = useNavigate();

    useEffect(() => {
       const compare = (a, b) => {
           if (sortType === "latest") {
               return Number(b.date) - Number(a.date);
           } else {
               return Number(a.date) - Number(b.date);
           }
       }
       const copyList = JSON.parse(JSON.stringify(data));
       copyList.sort(compare);
       setSortedData(copyList);
    }, [data, sortType]);

    const onClickNew = () => {
        if (authState.googleLoginId.length > 0) {
            navigate("/new");
        } else {
            alert('로그인 이후에 이용해주세요.');
        }
    };

    const onChangeSortType = (e) => {
      setSortType(e.target.value);
    };

    const onClickSvc = () => {
        alert('GenAI 서비스 점검중입니다');
        //window.location.href = "http://ec2-3-34-137-141.ap-northeast-2.compute.amazonaws.com/";
    };

    return (
      <div className="DiaryList">
          <div className="menu_wrapper">
              <div className="left_col">
                  <select vale={sortType} onChange={onChangeSortType}>
                      {sortOptionList.map((it, idx) => (
                        <option key={idx} value={it.value} >
                            {it.name}
                        </option>
                      ))}
                  </select>
              </div>
              <div className="right_col">
                  <Button
                      type={"positive"}
                      text={"새로운 문의 작성하기"}
                      onClick={onClickNew}
                  />
              </div>
              {!authState.showGoogleLogin && <div className="genAI_wrapper" >
                  <Button
                      type={"negative"}
                      text={"GenAI 이용하기"}
                      onClick={onClickSvc}
                  />
              </div> }
          </div>
          <div className="list_wrapper">
              {sortedData.map((it) => (
                  <DiaryItem key={it.id} {...it} />
              ))}
          </div>
      </div>
    );
};
export default DiaryList;
