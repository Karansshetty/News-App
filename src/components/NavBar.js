import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = ({ categories = [], theme = 'dark', onToggleTheme }) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState('');

  const themeLabel = theme === 'dark' ? 'Light mode' : 'Dark mode';
  const themeIcon = theme === 'dark' ? '☀️' : '🌙';

  const categoryLinks = useMemo(() => {
    const safe = Array.isArray(categories) ? categories : [];
    return safe.filter((c) => c && c.key && c.label);
  }, [categories]);

  const runSearch = () => {
    const q = searchText.trim();
    navigate(q ? `/search?q=${encodeURIComponent(q)}` : '/search');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runSearch();
  };

  return (
    <nav className="navbar fixed-top navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container-fluid">
        <NavLink className="navbar-brand fw-bold" to="/">
          NewsMonkey
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/" end>
                Home
              </NavLink>
            </li>

            {categoryLinks.map((c) => (
              <li className="nav-item" key={c.key}>
                <NavLink
                  className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
                  to={`/category/${c.key}`}
                >
                  {c.label}
                </NavLink>
              </li>
            ))}

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`} to="/about">
                About
              </NavLink>
            </li>
          </ul>

          <form className="d-flex gap-2" role="search" onSubmit={handleSubmit}>
            <input
              className="form-control"
              type="search"
              placeholder="Search news…"
              aria-label="Search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
            <button className="btn btn-outline-secondary" type="submit">
              Search
            </button>
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={onToggleTheme}
              aria-label={themeLabel}
              title={themeLabel}
            >
              {themeIcon}
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
