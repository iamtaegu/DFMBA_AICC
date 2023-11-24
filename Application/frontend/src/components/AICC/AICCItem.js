import React from "react";
import "./AICCItem.css";

/**
 * 등록된 아이템 개수만큼 렌더링 발생
 *  ㅇ 등록된 아이템은 체크박스에 의한 토글 발생이 아니면 리렌더링 될 필요 없음
 */
const AICCItem = ({ id, title, createDate, onClick }) => {

    let modifiedDate = createDate.replace('T', ' '); // 'T'를 공백으로 대체

    const onClickId = () => {
        onClick(id);
    };

    return (
        <div className="AICCItem">
            <div className="title_col">{title}</div>
            <div className="date_col">{modifiedDate}</div>
            <div className="btn_col">
                <button onClick={onClickId} >보기</button>
            </div>
        </div>
    );
};
export default React.memo(AICCItem);
