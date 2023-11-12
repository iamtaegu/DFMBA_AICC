import "./AICCList.css";
import AICCItem from "./AICCItem";
import {useState} from "react";

const AICCList = ({ todo, onClick }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
      setSearch(e.target.value);
    };
    const getSearchResult = () => {
      return search == "" ? todo
                        : todo.filter((it) => it._source.title.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className="AICCList">
            <h4>목록</h4>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar" placeholder="키워드를 입력하세요" />
            <div className="list_wrapper">
                { getSearchResult().map((it) => (
                        <AICCItem id={it._source.id} title={it._source.title} createDate={it._source.created_at}
                                  onClick={onClick}/>
                ))}
            </div>
        </div>
    );
};
export default AICCList;
