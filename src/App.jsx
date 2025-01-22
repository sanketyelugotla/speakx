import React, { useState } from 'react';
import Search from './assets/Search';
import Results from './assets/Results';
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
  });

  async function handleSearch() {
    setIsVisible(false);
    try {
      // Construct query parameters based on filterButtons state
      const filters = Object.keys(filterButtons)
        .filter((key) => filterButtons[key])
        .map((key) => `${key}=true`)
        .join('&');

      const response = await fetch(
        `http://localhost:3000/api/search?title=${title}&${filters}`
      );

      if (!response.ok) {
        throw new Error('No document found');
      }

      const data = await response.json();
      setResult(data);
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
      />
    </div>
  );
}
