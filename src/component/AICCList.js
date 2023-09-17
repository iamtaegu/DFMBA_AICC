import "./AICCList.css";
import AICCItem from "./AICCItem";
import {useState} from "react";

const AICCList = ({ todo, onUpdate, onDelete }) => {
    const [search, setSearch] = useState("");
    const onChangeSearch = (e) => {
      setSearch(e.target.value);
    };
    const getSearchResult = () => {
      return search == "" ? todo
                        : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
    };

    return (
        <div className="AICCList">
            <h4>❓ Question List</h4>
            <input
                value={search}
                onChange={onChangeSearch}
                className="searchbar" placeholder="문의 이력을 입력하세요" />
            <div className="list_wrapper">
                { getSearchResult().map((it) => (
                        <AICCItem key={it.id} {...it}
                                  onUpdate={onUpdate}
                                  onDelete={onDelete}/>
                ))}
            </div>
        </div>
    );
};
export default AICCList;
