import React, { useState } from 'react';
import Search from './assets/Search';
import Results from './assets/Results';
import Filters from './assets/Filters';
import './App.css';

export default function App() {
  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [filterButtons, setFilterButtons] = useState({
    anagram: false,
    read: false,
    mcq: false,
    content: false,
    conversation: false
  });

  const [currentPage, setCurrentPage] = useState(1);

  function handleSearch() {
    handleSearch2(50)
    setTimeout(() => {

    }, 2000)
    handleSearch2(10000)
  }

  const base_call1 = "https://speakx-api.vercel.app";
  const base_call2 = "http://localhost:3000";

  async function handleSearch2(limit) {
    setIsVisible(false);
    setCurrentPage(1);
    try {
      // Construct query parameters based on filterButtons state
      const filters = Object.keys(filterButtons)
        .filter((key) => filterButtons[key])
        .map((key) => `${key}=true`)
        .join('&');
      const response = await fetch(
        `${base_call2}/api/search?title=${title}&${filters}&limit=${limit}`
      );

      if (!response.ok) {
        throw new Error('No document found');
      }

      const data = await response.json();
      setResult(data);
      // console.log(result)
      setIsVisible(true);
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  }

  return (
    <div className='whole'>
      <Search
        title={title}
        setTitle={setTitle}
        handleSearch={handleSearch}
        filterButtons={filterButtons}
        setFilterButtons={setFilterButtons}
      />
      <Results
        isVisible={isVisible}
        error={error}
        result={result}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      {/* <Filters /> */}
    </div>
  );
}
