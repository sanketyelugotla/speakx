import React, { useState } from 'react';

export default function Results({ isVisible, error, result }) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ensure result is valid
  const validResult = result?.results || [];
  const totalPages = Math.ceil(validResult.length / itemsPerPage);

  const currentItems = validResult.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className={`docs ${isVisible ? '' : 'hide'}`}>
      {error && <p className='red'>{error}</p>}

      {validResult.length > 0 ? (
        <div>
          <h2 className='center results'>Search Results:</h2>
          {currentItems.map((item, index) => (
            <div key={item._id?.$oid || index} style={{ marginBottom: '20px' }}>
              <p>
                <strong>Title:</strong> {item.title || 'N/A'}
              </p>
              <p>
                <strong>Type:</strong> {item.type || 'N/A'}
              </p>
              <p>
                <strong>Solution:</strong> {item.solution || 'N/A'}
              </p>
            </div>
          ))}
          <div className='pagination'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? 'active' : ''}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
}
