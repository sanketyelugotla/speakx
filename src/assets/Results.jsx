import React, { useState, useEffect, useRef } from 'react';
import { v4 as rkey } from 'uuid';
import "./Results.css";

export default function Results({ isVisible, error, result, currentPage, setCurrentPage }) {
  const [visibleSolutions, setVisibleSolutions] = useState({});
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const containerRef = useRef(null);

  const validResult = result?.results || [];
  const totalItems = validResult.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = validResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const updateItemsPerPage = () => {
    const containerHeight = containerRef.current?.offsetHeight || 0;
    console.log(containerHeight);

    if (containerHeight < 580) {
      setItemsPerPage(12);
    } else {
      setItemsPerPage(5);
    }
  };

  useEffect(() => {
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, [result]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const createButton = (label, pageNumber, isDisabled, first) => (
    <button
      key={rkey()}
      onClick={() => handlePageChange(pageNumber)}
      disabled={isDisabled}
      className={`page-buttons ${currentPage === pageNumber ? 'active' : ''}`}
      style={{ backgroundColor: first ? "white" : "", boxShadow: first ? "none" : "" }}
    >
      {label}
    </button>
  );

  const toggleSolution = (index) => {
    setVisibleSolutions((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderContentByType = (item, index) => {
    if (item.type === "MCQ") {
      return displayMCQ(item, index);
    } else if (["READ_ALONG", "CONTENT_ONLY", "CONVERSATION"].includes(item.type)) {
      return displayText(item, index);
    } else if (item.type === "ANAGRAM") {
      return displayBlocks(item, index);
    } else {
      return <p className='err'>No Documents Found</p>;
    }
  };

  const renderTitle = (item, index) => (
    <p className='q'>
      <strong>{index + 1}. {item.title} ({item.type})</strong>
    </p>
  );

  const displayMCQ = (item, index) => {
    const correctAnswer = item.options.find(opt => opt.isCorrectAnswer)?.text || "No solution available";

    return (
      <div key={rkey()} className='que'>
        {renderTitle(item, index)}
        <ol type='a'>
          {item.options.map((opt, key) => (
            <li key={rkey()}>{opt.text}</li>
          ))}
        </ol>
        <button className={`sol-btn ${visibleSolutions[index] ? "active" : ""}`} onClick={() => toggleSolution(index)}>View Solution</button>
        {visibleSolutions[index] && (
          <p className='q sol'><strong>Solution:</strong> <span>{correctAnswer}</span></p>
        )}
      </div>
    );
  };

  const displayBlocks = (item, index) => {
    const shuffledBlocks = item.blocks.map((block) => ({ ...block, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort);

    return (
      <div key={rkey()} className='que'>
        {renderTitle(item, index)}
        <ol>
          {shuffledBlocks.map((block, idx) => (
            <li key={rkey()}>{block.text}</li>
          ))}
        </ol>
        <button className={`sol-btn ${visibleSolutions[index] ? "active" : ""}`} onClick={() => toggleSolution(index)}>View Solution</button>
        {visibleSolutions[index] && (
          <p className='q sol'><strong>Solution:</strong> <span>{item.solution}</span></p>
        )}
      </div>
    );
  };

  const displayText = (item, index) => (
    <div key={rkey()} className='que'>
      {renderTitle(item, index)}
    </div>
  );

  return (
    <>
      {validResult.length === 0 && <p className='err'>No Documents Found</p>}
      <div className={`docs ${isVisible ? '' : 'hide'}`}>
        {error && <p className="red">{error}</p>}
        <div className={`res_pag ${validResult.length > 0 ? "" : "hide"}`}>
          <p className='question'>?</p>
          <p className='exclamation'>!</p>
          <div className='scrollable'>
            <div className='inside' ref={containerRef}>
              {currentItems.map((item, index) =>
                renderContentByType(item, (itemsPerPage * (currentPage - 1)) + index)
              )}
            </div>
          </div>
          <div className="pagination">
            {createButton(<img className='arrows' src='./left_arrow.png' alt="Left Arrow" />, currentPage - 1, currentPage === 1, true)}
            {currentPage >= 4 && (
              <>
                {createButton(1, 1, currentPage === 1)}
                <span className='dots'>....</span>
              </>
            )}
            {Array.from({ length: Math.min(totalPages, 4) }, (_, index) => {
              const page = Math.max(1, currentPage - 2) + index;
              return (
                page <= totalPages &&
                createButton(page, page, currentPage === page)
              );
            })}
            {currentPage < totalPages - 1 && (
              <>
                <span className='dots'>....</span>
                {createButton(totalPages, totalPages, currentPage === totalPages)}
              </>
            )}
            {createButton(<img className='arrows' src='./right-arrow.png' alt="Right Arrow" />, currentPage + 1, currentPage === totalPages, true)}
          </div>
        </div>
      </div>
    </>
  );
}