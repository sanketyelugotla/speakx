import React, { useState } from 'react';
import Search from './assets/Search';
import Results from './assets/Results';


import './App.css'

export default function App() {

  const [title, setTitle] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isVisible, setIsVisible] = useState(true);

  async function handleSearch() {
    setIsVisible(false)
    try {
      const response = await fetch(`http://localhost:3000/api/search?title=${title}`);

      if (!response.ok) {
        throw new Error('No document found');
      }

      const data = await response.json();
      setResult(data);
      setIsVisible(true)
      setError(null);
    } catch (error) {
      setError(error.message);
      setResult(null);
    }
  };

  return (
    <div className='whole'>
      <Search title={title} setTitle={setTitle} handleSearch={handleSearch} />
      <Results title={title} setTitle={setTitle} isVisible={isVisible} error={error} result={result} />
    </div >
  );
};