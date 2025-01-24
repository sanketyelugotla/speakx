import React, { useState } from 'react';
import "./Results.css";

export default function Results({ isVisible, error, result }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleSolutions, setVisibleSolutions] = useState({}); // Tracks which solutions are visible
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
      key={label}
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
      [index]: !prev[index], // Toggle visibility for the specific question
    }));
  };

  const displayMCQ = (item, index) => {
    // Find the correct solution before rendering options
    const correctAnswer = item.options.find(opt => opt.isCorrectAnswer)?.text || "No solution available";

    return (
      <div key={item._id?.$oid || item.title} className='que'>
        <p className='q'>{index + 1}. {item.title} ({item.type})</p>
        <ol>
          {item.options.map((opt, key) => (
            <li key={key}>{opt.text}</li>
          ))}
        </ol>
        <button onClick={() => toggleSolution(index)}>View Solution</button>
        {visibleSolutions[index] && (
          <p className='q'><strong>Solution:</strong> {correctAnswer}</p>
        )}
      </div>
    );
  };

  const displayBlocks = (item, index) => {
    const shuffledBlocks = item.blocks.map((block) => ({ ...block, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort);

    return (
      <div className='que'>
        <strong><p className='q'>{index + 1}. {item.title} ({item.type})</p></strong>
        <ol>
          {shuffledBlocks.map((block, idx) => (
            <li key={idx}>{block.text}</li>
          ))}
        </ol>
        <button onClick={() => toggleSolution(index)}>View Solution</button>
        {visibleSolutions[index] && (
          <p className='q'><strong>Solution:</strong> {item.solution}</p>
        )}
      </div>
    );
  };

  return (
    <div className={`docs ${isVisible ? '' : 'hide'}`}>
      <p className='question'>?</p>
      <p className='exclamation'>!</p>
      {error && <p className="red">{error}</p>}

      {validResult.length > 0 && (
        <div className="res_pag">
          <div className='scrollable'>
            <div className='inside'>
              {currentItems.map((item, index) => {
                if (item.type === "MCQ") {
                  return displayMCQ(item, index);
                } else if (item.type === "READ_ALONG") {
                  return (
                    <div key={index} className='que'>
                      <p className='q'>{index + 1}. {item.title} ({item.type})</p>
                      <p>Type: {item.type}</p>
                    </div>
                  );
                } else {
                  return displayBlocks(item, index);
                }
              })}
            </div>
          </div>
          <div className="pagination">
            {/* Previous Button */}
            {createButton(<img className='arrows' src='./public/left_arrow.png' alt="Left Arrow" />, currentPage - 1, currentPage === 1, true)}

            {/* Page Numbers */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, index) => {
              const page = Math.max(1, currentPage - 2) + index;
              return (
                page <= totalPages &&
                createButton(page, page, currentPage === page)
              );
            })}

            {/* Next Button */}
            {createButton(<img className='arrows' src='./public/right-arrow.png' alt="Right Arrow" />, currentPage + 1, currentPage === totalPages)}
          </div>
        </div>
      )}
    </div>
  );
}
