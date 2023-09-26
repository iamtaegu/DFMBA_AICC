import './App.css';
import Header from "./component/Header";
import AICCEditor from "./component/AICCEditor";
import AICCList from "./component/AICCList";
import {useState, useRef, useReducer, useCallback} from "react";

const mockTodo = [
    {
        id: 0,
        isDone: false,
        content: "Do Q&A Crawling",
        createDate: new Date().getTime(),
    },
    {
        id: 1,
        isDone: false,
        content: "Get Pattern Matching (ElasticSearch)",
        createDate: new Date().getTime(),
    },
    {
        id: 2,
        isDone: false,
        content: "Get additional answer based on GenerativeAI",
        createDate: new Date().getTime(),
    },
]

/**
 * 상태(변화)코드 분리
 * useState 같은 경우에는 컴포넌트 안에 선언 돼 있기 때문에 상태코드를 분리할 수 없음
 * useReducer 훅에 의해서
 *  dispatch 호출 > reducer 호출
 */
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

function App() {
    /*
    * todo - mockTodo
    * 컴포넌트에서 상태변화 코드 분리를 위한 리액트 훅 변경
    *   useState -> useReducer
    * 최적화
    *   ㅇ useCallback: 불필요한 함수 재생성 방지
    *       - onCreate에서는 reducer에 최신 state만 제공하기 때문에 불필요
    *       - onDelete, onUpdate에만 적용
    */

    //const [todo, setTodo] = useState(mockTodo);
    const [todo, dispatch] = useReducer(reducer, mockTodo);

    const idRef = useRef(3);

    const onCreate = (content) => {
        dispatch({
            type: "CREATE",
            newItem: {
                id: idRef.current,
                content,
                isDone: false,
                createDate: new Date().getTime(),
            },
        });
        idRef.current += 1;
    };

    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: "UPDATE",
            targetId,
        });
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({
          type: "DELETE",
          targetId,
        });
    }, []);

    return (
    <div className="App">
        <Header />
        <AICCEditor onCreate={onCreate} />
        <AICCList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
    );
}

export default App;
