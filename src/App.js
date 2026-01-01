
import './App.css';

import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import About from './components/About';

const THEME_STORAGE_KEY = 'nm-theme';

const App = () => {
  const categories = useMemo(
    () => [
      { key: 'business', label: 'Business' },
      { key: 'technology', label: 'Technology' },
      { key: 'sports', label: 'Sports' },
      { key: 'health', label: 'Health' },
      { key: 'entertainment', label: 'Entertainment' },
      { key: 'science', label: 'Science' }
    ],
    []
  );

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    return saved === 'dark' || saved === 'light' ? saved : 'dark';
  });

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', theme);
    document.body.classList.toggle('nm-dark', theme === 'dark');
    document.body.classList.toggle('nm-light', theme === 'light');
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <div>
      <NavBar categories={categories} theme={theme} onToggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<News pageSize={6} category={null} />} />

        {categories.map((c) => (
          <Route
            key={c.key}
            path={`/category/${c.key}`}
            element={<News pageSize={6} category={c.key} />}
          />
        ))}

        <Route path="/search" element={<News pageSize={6} mode="search" />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
};

export default App;