import { useState } from "react";
import { CiSearch } from "react-icons/ci";

export default function Search({ title, setTitle, inputChanged, handleSearch }) {
    const [isInputOpen, setIsInputOpen] = useState(false);
    function openInput() {
        setIsInputOpen(true)
    }

    function inputChanged(event) {
        console.log(event.target.value)
        setTitle(event.target.value)
        handleSearch()
      }

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
        </div>
    )
}