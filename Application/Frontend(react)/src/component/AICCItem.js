import React from "react";
import "./AICCItem.css";

/**
 * 등록된 아이템 개수만큼 렌더링 발생
 *  ㅇ 등록된 아이템은 체크박스에 의한 토글 발생이 아니면 리렌더링 될 필요 없음
 */
const AICCItem = ({ id, content, isDone, createDate, onUpdate, onDelete }) => {
    const onChangeCheckbox = () => {
        onUpdate(id);
    };

    const onClickDelete = () => {
        onDelete(id);
    };

    return (
        <div className="AICCItem">
            <div className="checkbox_col">
                <input onChange={onChangeCheckbox} checked={isDone} type="checkbox" />
            </div>
            <div className="title_col">{content}</div>
            <div className="date_col">{new Date(createDate).toDateString()}</div>
            <div className="btn_col">
                <button onClick={onClickDelete} >삭제</button>
            </div>
        </div>
    );
};
export default React.memo(AICCItem);
