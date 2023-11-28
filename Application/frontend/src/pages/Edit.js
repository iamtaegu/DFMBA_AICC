import {useNavigate, useParams} from "react-router-dom";
import useDiary from "../hooks/useDiary";
import {useContext} from "react";
import {DiaryDispatchContext} from "../App";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";

import axios from 'axios';
import {deleteUserHistory, getSentiment, updateUserHistory} from "../util";

const Edit = () => {
    const { id } = useParams();
    const data = useDiary(id);

    const navigate = useNavigate();
    const { onUpdate, onDelete } = useContext(DiaryDispatchContext);
    const goBack = () => {
        navigate(-1);
    };
    const onClickDelete = async () => {
        if (window.confirm("정말 삭제할까요 ? ")) {
            await deleteUserHistory(data.docId);
            onDelete(id, data.docId);
            navigate("/", { replace: true });
        }
    };

    const onSubmit = async (data) => {

        if (window.confirm("정말 수정할까요 ? ")) {
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

            const { docId, date, content, emotionId } = data;

            /* call firestore */
            const docData = {
                date: new Date().getTime(),
                content,
                emotionId,
                fetchDataList,
            }
            await updateUserHistory(docId, docData);
            onUpdate(id, docId, date, content, emotionId, fetchDataList);
            navigate("/", { replace:true });
        }
    };

    if (!data) {
        return <div>불러오고 있습니다...</div>
    } else {
        return (
            <div>
                <Header
                    title={"수정하기"}
                    leftChild={<Button text={"< 뒤로 가기"} onClick={goBack} />}
                    rightChild={<Button type={"negative"}
                                        text={"삭제하기"}
                                        onClick={onClickDelete}
                    />}
                />
                <Editor initData={data} onSubmit={onSubmit} />
            </div>
        );
    }
};

export default Edit;
