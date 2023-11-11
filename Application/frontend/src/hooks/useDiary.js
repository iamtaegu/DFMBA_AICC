import {useContext, useEffect, useState} from "react";
import {DiaryStateContext} from "../App";
import {useNavigate} from "react-router-dom";

/**
 * URL 파라미터 id와 일치하는 데이터 가져오는 커스텀 훅
 * 존재하지 않는 URL 파라미터는 home("/") 으로 이동시킴
 * @param id
 * @returns {undefined}
 */
const useDiary = (id) => {
    const data = useContext(DiaryStateContext);
    const [diary, setDiary] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const matchDiary = data.find((it) => String(it.id) === String(id));
        if (matchDiary) {
            setDiary(matchDiary);
        } else {
            alert("존재하지 않습니다");
            navigate("/", { replace:true });
        }
    }, [id, data]);

    return diary;
};
export default useDiary;
