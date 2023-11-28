import {useNavigate} from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import {useContext, useState} from "react";
import {DiaryDispatchContext, GoogleLoginStateContext} from "../App";

import axios from 'axios';
import {getSentiment, setUserHistory} from "../util";

const New = () => {
    const navigate = useNavigate();
    const { onCreate } = useContext(DiaryDispatchContext);
    const goBack = () => {
        navigate(-1);
    };

    const authState = useContext(GoogleLoginStateContext);

    const onSubmit = async (data) => {

        /**
         * 1. 문의 내용을 queryString parameter로 setting
         *  ㅁ content, sentiment
         * 2. 응답 값 중 message.hits.hits(Array) 추출
         * 3. data.content 내용을 추출한 값으로 변경
         */
        let fetchData = null;
        let param = '?title=' + data.content;
        let param_sentiment = getSentiment(data.emotionId);
        param += param_sentiment.length > 0 ? "&sentiment=" + param_sentiment : "";

        try {
            const resp = await axios.get('https://7yqpg0pc1k.execute-api.ap-northeast-2.amazonaws.com/dev/news_searchs' + param);
            fetchData = typeof resp.data === 'string' ? JSON.parse(resp.data) : resp.data;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        let fetchDataList = fetchData.message.hits.hits;

        const { date, content, emotionId } = data;
        const docId = new Date().getTime().toString();
        onCreate(docId, date, content, emotionId, fetchDataList);

        /* call firestore */
        const docData = {
            date: new Date().getTime(),
            content,
            emotionId,
            fetchDataList,
        }

        await setUserHistory (docData, docId, authState.googleLoginId);

        navigate("/", { replace: true });
    };

    return (
        <div>
            <Header
                title={"새 글 쓰기"}
                leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
            />
            <Editor onSubmit={onSubmit} />
        </div>
    )
};

export default New;
