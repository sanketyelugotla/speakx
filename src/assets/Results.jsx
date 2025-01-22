import React, { useState } from 'react';

export default function Results({ isVisible, error, result }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Number of items to display per page

  // Calculate total pages
  const totalPages = result ? Math.ceil(result.length / itemsPerPage) : 0;

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = result ? result.slice(indexOfFirstItem, indexOfLastItem) : [];

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={`docs ${isVisible ? '' : 'hide'}`}>
      {error && <p className='red'>{error}</p>}

      {result && (
        <div>
          <h2 className='center results'>Search Results:</h2>
          {currentItems.map((item) => (
            <div key={item._id.$oid} style={{ marginBottom: '20px' }}>
              <p><strong>Title: </strong>{item.title}</p>
              <p><strong>Type:</strong> {item.type}</p>
              <p><strong>Solution:</strong> {item.solution}</p>
            </div>
          ))}
          {/* Pagination Controls */}
          <div className='pagination'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
