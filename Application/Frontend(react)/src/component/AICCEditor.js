import "./AICCEditor.css";
import { useState,useRef } from "react";

/*
* App에서 Props로 받은 함수 onCreate 호출
* */
const AICCEditor = ({ onCreate }) => {

    /**
     * 사용자가 입력 폼에 입력한 데이터를 저장할 State 변수
     * 입력 폼의 onChange 이벤트 핸들러 onChangeContent
     * 입력 폼의 value 속성으로 content 값 설정, 이벤트 핸들러로 onChangeContent 설정
     */
    const [content, setContent] = useState("");
    const inputRef = useRef();
    const onChangeContent = (e) => {
        setContent(e.target.value);
    }
    const onSubmit = () => {
        if (!content) {
            inputRef.current.focus();
            return;
        }
        onCreate(content);
        setContent("");
    };
    const onKeyDown = (e) => {
        if (e.keyCode == 13) {
            onSubmit();
        }
    };

    return (
        <div className="AICCEditor">
            <h4>새로운 문의 작성하기</h4>
            <div className="editor_wrapper">
                <input
                    ref={inputRef}
                    value={content}
                    onChange={onChangeContent}
                    onKeyDown={onKeyDown}
                    placeholder="문의..." />
                <button onClick={onSubmit}>추가</button>
            </div>
        </div>
    )
};
export default AICCEditor;
