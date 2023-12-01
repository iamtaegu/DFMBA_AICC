import "../AICC/AICCList.css";

import NewsTrendChart from "./newsComponents/NewsTrendChart";
import SentimentTrendChart from "./newsComponents/SentimentTrendChart";
import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {type} from "os";

export default function NewsTrendContent(date: any) {
    const navigate = useNavigate();
    const { pathname, search } = useLocation();

    const params = new URLSearchParams(search);
    const searchText = params.get("search") || ""; // 파라미터 가져오거나, 없으면 공백("")
    const [ inputText, setInputText ] = useState(searchText);

    function onSearch() {
        let url = pathname;

        if (inputText) {
            url += `?search=${inputText}`;
        }

        navigate(url);
    }

    return (
        <div>
            <input
                value={inputText}
                onChange = {(e) => {
                    setInputText(e.target.value);
                }}
                onKeyDown = {(e) => {
                    if (e.key === "Enter") {
                        onSearch();
                    }
                }}
                className="searchbar" placeholder="키워드를 입력하세요" />
            <NewsTrendChart search={searchText} date={date.date} />
            <SentimentTrendChart search={searchText} date={date.date} />
        </div>
    );
}