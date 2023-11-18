import './App.css';

import {Routes, Route, Link} from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary.";
import Edit from "./pages/Edit";
import React, {useEffect, useReducer, useRef, useState} from "react";

function reducer(state, action) {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            return [action.data, ...state];
        }
        case "UPDATE": {
            return state.map((it) =>
                String(it.id) === String(action.data.id) ? {...action.data} : it
            );
        }
        case "DELETE": {
            return state.filter((it) => String(it.id) !== String(action.targetId));
        }
        default: {
            return state;
        }
    }
}

function App() {
  /* 데이터 초기 로딩 확인을 위한 State 변수 */
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0); // 리스트 아이템별 고유한 key를 부여하기 위함

  useEffect(() => {
      dispatch({
         type: "INIT",
         data: [],
      });
      setIsDataLoaded(true)
  }, []);

  const onCreate = (date, content, emotionId, fetchDataList) => {
      dispatch({
          type: "CREATE",
          data: {
              id: idRef.current,
              date: new Date(date).getTime(),
              content,
              emotionId,
              fetchDataList,
          },
      });
      idRef.current += 1;
  };
  const onUpdate = (targetId, date, content, emotionId, fetchDataList) => {
        dispatch({
            type: "UPDATE",
            data: {
                id: targetId,
                date: new Date(date).getTime(),
                content,
                emotionId,
                fetchDataList,
            },
        });
  };
  const onDelete = (targetId) => {
      dispatch({
          type: "DELETE",
          targetId,
      });
  };

  if (!isDataLoaded) {
      return <div>데이터를 불러오는 중입니다</div>
  } else {
      return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider
                value={{
                    onCreate,
                    onUpdate,
                    onDelete}}
            >
            <div className="App">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/new" element={<New/>}/>
                    <Route path="/diary/:id" element={<Diary/>}/>
                    <Route path="/edit/:id" element={<Edit/>}/>
                </Routes>
            </div>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
      );
  }

}

/**
 * Props Drilling 없이 모든 페이지에서 일기 State와 이를 업데이트하는 함수를 사용하도록 하기 위함
 *  1. DiaryStateContext.Provider로 App 컴포넌트의 return 문 태그 내부를 감쌈
 *  2. Props로 일기 State 값을 전달
 *  3. DiaryStateContext.Provider 하위 컴포넌트는 Props Drilling 없이 useContext를 이용해 일기 State 사용이 가능
 */
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();
export default App;
