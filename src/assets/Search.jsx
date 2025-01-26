import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";

import "./Search.css"

export default function Search({ title, setTitle, handleSearch, filterButtons, setFilterButtons }) {
    const [isInputOpen, setIsInputOpen] = useState(true);
    function openInput() {
        setIsInputOpen(true)
    }

    function inputChanged(event) {
        // console.log(event.target.value)
        setTitle(event.target.value)
    }

    function handleFilterButtonClick(event) {
        const { id } = event.target;
        setFilterButtons((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    }

    // const hasMounted = useRef(0);
    const timerRef = useRef(null);

    function debounce(func, delay) {
        return function () {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(func, delay);
        };
    }

    useEffect(() => {
        debounce(() => handleSearch(), 400)();
    }, [filterButtons, title]);

    return (
        <div className='input'>
            {/* <h1>{isInputOpen ? search : begin}</h1> */}
            <div className="heading-container">
                <h1 className={`smooth ${isInputOpen ? "closed" : ""}`}>Click to begin</h1>
                <h1 className={`smooth ${isInputOpen ? "" : "closed"}`}>Question Bank</h1>
            </div>
            {isInputOpen ? "" : <CiSearch className="search-icon" onClick={openInput} />}
            <CiSearch className={`search-icon-inp ${isInputOpen ? "" : "input-open"}`} />
            <input
                className={`title-input ${isInputOpen ? "" : "input-open"}`}
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={inputChanged}
            />

            <div className={`filter-buttons ${isInputOpen ? "" : "hide"}`}>
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
                <button
                    id="content"
                    className={`f-button ${filterButtons.content ? "active" : ""}`}
                    onClick={handleFilterButtonClick}
                >
                    CONTENT ONLY
                </button>
                <button
                    id="conversation"
                    className={`f-button ${filterButtons.conversation ? "active" : ""}`}
                    onClick={handleFilterButtonClick}
                >
                    CONVERSATION
                </button>
            </div>

        </div>
    )
}