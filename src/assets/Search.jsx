import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import "./Search.css"
import { useReducer } from "react";

export default function Search({ title, setTitle, handleSearch, filterButtons, setFilterButtons }) {
    const [isInputOpen, setIsInputOpen] = useState(false);
    function openInput() {
        setIsInputOpen(true)
    }

    function inputChanged(event) {
        console.log(event.target.value)
        setTitle(event.target.value)
        handleSearch()
    }

    function handleFilterButtonClick(event) {
        const { id } = event.target;
        setFilterButtons((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    const hasMounted = useRef(0)
    useEffect(() => {
        if (hasMounted.current > 2) {
            console.log("Use Effect")
          handleSearch();
        } else {
          hasMounted.current = hasMounted.current + 1;
        }
      }, [filterButtons]);

    return (
        <div className='input'>
            {/* <h1>{isInputOpen ? search : begin}</h1> */}
            <div className="heading-container">
                <h1 className={`smooth ${isInputOpen ? "closed" : ""}`}>Click to begin</h1>
                <h1 className={`smooth ${isInputOpen ? "" : "closed"}`}>Search by Title</h1>
            </div>
            {isInputOpen ? "" : <CiSearch className="search-icon" onClick={openInput} />}
            <input
                className={`title-input ${isInputOpen ? "" : "input-open"}`}
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={inputChanged}
            />
            {isInputOpen &&
                <div className="filter-buttons">
                    <button
                        id="anagram"
                        className={`f-button ${filterButtons.anagram ? "active" : ""}`}
                        onClick={handleFilterButtonClick}
                    >
                        ANAGRAM
                    </button>
                    <button
                        id="read"
                        className={`f-button ${filterButtons.read ? "active" : ""}`}
                        onClick={handleFilterButtonClick}
                    >
                        READ ALONG
                    </button>
                    <button
                        id="mcq"
                        className={`f-button ${filterButtons.mcq ? "active" : ""}`}
                        onClick={handleFilterButtonClick}
                    >
                        MCQ
                    </button>
                </div>
            }
        </div>
    )
}