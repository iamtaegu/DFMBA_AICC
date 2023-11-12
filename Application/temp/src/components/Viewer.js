import "./Viewer.css";
import {emotionList} from "../util";
import AICCList from "./AICC/AICCList";
import {useCallback, useReducer, useRef, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "CREATE": {
            return [action.newItem, ...state];
        }
        case "UPDATE": {
            return state.map((it) =>
                it.id === action.targetId ? {
                    ...it,
                    isDone: !it.isDone,
                } : it
            );
        }
        case "DELETE": {
            return state.filter((it) => it.id !== action.targetId);
        }
        default:
            return state;
    }
}


const Viewer = ({ content, emotionId, fetchDataList }) => {
    const emotionItem = emotionList.find((it) => it.id === emotionId);

    const [todo, dispatch] = useReducer(reducer, fetchDataList);

    const [bodyContent, setBodyContent] = useState(false);

    const idRef = useRef(3);

    const onClick = (id) => {
        let idBody = fetchDataList.find((it) => it._source.id === id)._source.body;
        setBodyContent(idBody);
    }

    return (
        <div className="Viewer">
            <section>
                <h4>sentiment</h4>
                <div className={["emotion_img_wrapper", `emotion_img_wrapper_${emotionId}`,].join(" ")}>
                    <img alt={emotionItem.name} src={emotionItem.img} />
                    <div className="emotion_descript">{emotionItem.name}</div>
                </div>
            </section>
            <AICCList todo={todo} onClick={onClick} />
            <section>
                <h4>내용</h4>
                <div className="content_wrapper">
                    <p>{bodyContent}</p>
                </div>
            </section>
        </div>
    );
};
export default Viewer;
