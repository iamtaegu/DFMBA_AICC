import './App.css';

import React, {useEffect, useReducer, useRef, useState} from "react";
import {Routes, Route, Link} from "react-router-dom";

import Home from "./pages/Home";
import New from "./pages/New";
import Diary from "./pages/Diary.";
import Edit from "./pages/Edit";

import {DiaryEntry, AuthState, setUserHistory} from "./util";

type DiaryAction =
    | { type: "INIT"; data: DiaryEntry[] }
    | { type: "CREATE"; data: DiaryEntry }
    | { type: "UPDATE"; data: DiaryEntry }
    | { type: "DELETE"; targetId: number };


function reducer(state: DiaryEntry[], action: DiaryAction) {
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

  const [showGoogleLogin, setShowGoogleLogin] = useState(true);
  const [googleLoginId, setGoogleLoginId] = useState("");

  const authStateValue = {
      showGoogleLogin,
      setShowGoogleLogin,
      googleLoginId,
      setGoogleLoginId,
  };

  useEffect(() => {
      dispatch({
         type: "INIT",
         data: [],
      });
      setIsDataLoaded(true)
  }, []);

  const onInit = () => {
      setShowGoogleLogin(true);
      setGoogleLoginId('');
      dispatch({
          type: "INIT",
          data: [],
      });
  }

  const onCreate = (docId: string, date: Date, content: string, emotionId: number, fetchDataList: any) => {

      console.log(idRef.current);

      const createData = {
          id: idRef.current,
          docId: docId,
          date: new Date(date).getTime(),
          content,
          emotionId,
          fetchDataList,
      }

      dispatch({
          type: "CREATE",
          data: createData,
      });
      idRef.current += 1;
  };
  const onUpdate = (targetId: number, docId: string, date: Date, content: string, emotionId: number, fetchDataList: any) => {
        dispatch({
            type: "UPDATE",
            data: {
                id: targetId,
                docId: docId,
                date: new Date(date).getTime(),
                content,
                emotionId,
                fetchDataList,
            },
        });
  };
  const onDelete = (targetId: number, docId: string) => {
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
                    onInit,
                    onCreate,
                    onUpdate,
                    onDelete}}
            >
                <GoogleLoginStateContext.Provider value={authStateValue}>
                    <div className="App">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="/new" element={<New/>}/>
                            <Route path="/login" element={<New/>}/>
                            <Route path="/diary/:id" element={<Diary/>}/>
                            <Route path="/edit/:id" element={<Edit/>}/>
                        </Routes>
                    </div>
                </GoogleLoginStateContext.Provider>
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
export const GoogleLoginStateContext = React.createContext<AuthState | undefined>(undefined);
export const DiaryStateContext = React.createContext<DiaryEntry[]>([]);
export const DiaryDispatchContext = React.createContext({
    onInit: () => {},
    onCreate: (docId: string, date: Date, content: string, emotionId: number, fetchDataList: any) => {},
    onUpdate: (
        targetId: number,
        docId: string,
        date: Date,
        content: string,
        emotionId: number,
        fetchDataList: any
    ) => {},
    onDelete: (targetId: number, docId: string) => {},
});
export default App;
