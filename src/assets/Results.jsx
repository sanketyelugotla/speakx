import React, { useState } from 'react';
import { v4 as rkey } from 'uuid';

// const key = rkey();
import "./Results.css";

export default function Results({ isVisible, error, result, currentPage, setCurrentPage }) {

  const [visibleSolutions, setVisibleSolutions] = useState({});
  const itemsPerPage = 5;

  const validResult = result?.results || [];
  const totalItems = validResult.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const currentItems = validResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  const displayMCQ = (item, index) => {
    const correctAnswer = item.options.find(opt => opt.isCorrectAnswer)?.text || "No solution available";

    return (
      <div key={rkey()} className='que'>
        <p className='q'>{index + 1}. {item.title} ({item.type})</p>
        <ol>
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
        <strong><p className='q'>{index + 1}. {item.title} ({item.type})</p></strong>
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

  return (
    <>
      {validResult.length === 0 && <p className='err'>No Documents Found</p>}
      <div className={`docs ${isVisible ? '' : 'hide'}`}>
        {error && <p className="red">{error}</p>}
        <div className={`res_pag ${validResult.length > 0 ? "" : "hide"}`}>
          <p className='question'>?</p>
          <p className='exclamation'>!</p>
          <div className='scrollable'>
            <div className='inside'>
              {currentItems.map((item, index) => {
                if (item.type === "MCQ") {
                  return displayMCQ(item, (itemsPerPage * (currentPage - 1)) + index);
                } else if (item.type === "READ_ALONG" || item.type === "CONTENT_ONLY" || item.type === "CONVERSATION") {
                  return (
                    <div key={rkey} className='que'>
                      <p className='q'><strong>{(itemsPerPage * (currentPage - 1)) + index + 1}. {item.title} ({item.type})</strong></p>
                      {/* <p>Type: {item.type}</p> */}
                    </div>
                  );
                } else if (item.type === "ANAGRAM") {
                  return displayBlocks(item, (itemsPerPage * (currentPage - 1)) + index);
                }
                else {
                  return (
                    <p className='err'>No Documents Found</p>
                  )
                }
              })}
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
