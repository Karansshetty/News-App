import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News = (props) => {
  const location = useLocation();

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  const category = props.category || null;
  const isSearchMode =
    props.mode === "search" || location.pathname.startsWith("/search");

  const query = useMemo(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q");
    return q ? String(q).trim() : "";
  }, [location.search]);

  const categoryLabel = useMemo(() => {
    if (!category) return null;
    return category.charAt(0).toUpperCase() + category.slice(1);
  }, [category]);

  const heading = useMemo(() => {
    if (isSearchMode) return query ? `Search results for "${query}"` : "Search News";
    if (categoryLabel) return `${categoryLabel} Headlines`;
    return "Top Headlines";
  }, [isSearchMode, query, categoryLabel]);

  // ✅ UPDATED: backend API route
  const buildUrl = (pageNumber) => {
    if (isSearchMode) {
      if (!query) return null;
      return `/api/news?q=${encodeURIComponent(
        query
      )}&page=${pageNumber}&pageSize=${props.pageSize}`;
    }

    return `/api/news?page=${pageNumber}&pageSize=${props.pageSize}&category=${category}`;
  };

  const fetchNews = async (pageNumber, options = {}) => {
    const url = buildUrl(pageNumber);

    if (!url) {
      setArticles([]);
      setTotalResults(0);
      setPage(1);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || "Failed to load news");
      }

      setArticles(Array.isArray(data?.articles) ? data.articles : []);
      setTotalResults(Number(data?.totalResults) || 0);
      setPage(pageNumber);
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "Failed to load news.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousClick = async () => {
    const previousPage = page - 1;
    if (previousPage < 1) return;
    await fetchNews(previousPage);
  };

  const handleNextClick = async () => {
    const nextPage = page + 1;
    if (nextPage > Math.ceil(totalResults / props.pageSize)) return;
    await fetchNews(nextPage);
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchNews(1, { signal: controller.signal });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageSize, category, isSearchMode, query]);

  const totalPages = Math.ceil(totalResults / props.pageSize) || 0;
  const canGoPrev = page > 1;
  const canGoNext = totalPages > 0 && page < totalPages;

  const badgeText = isSearchMode ? "Search" : categoryLabel || "News";

  const renderSkeletons = () => {
    const count = Math.min(Number(props.pageSize) || 6, 12);
    return Array.from({ length: count }).map((_, idx) => (
      <div className="col-12 col-sm-6 col-lg-4" key={`skeleton-${idx}`}>
        <div className="card h-100 nm-card">
          <div
            className="card-img-top bg-body-secondary placeholder"
            style={{ height: "180px" }}
          />
          <div className="card-body">
            <div className="placeholder-glow">
              <span className="placeholder col-8"></span>
              <span className="placeholder col-6"></span>
              <span className="placeholder col-10"></span>
              <span className="placeholder col-7"></span>
            </div>
            <div className="mt-3">
              <span className="placeholder btn btn-secondary disabled col-5"></span>
            </div>
          </div>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <div className="text-center my-3">
        <h1 className="nm-gradient-text mb-1">{heading}</h1>
        <p className="text-body-secondary mb-0 small">
          {isSearchMode
            ? "Powered by NewsAPI (via server)"
            : "Top headlines (via server)"}
        </p>
      </div>

      {loading && <Spinner />}

      {!loading && error && (
        <div className="nm-state">
          <div className="alert alert-danger mb-0" role="alert">
            {error}
          </div>
        </div>
      )}

      {!loading && !error && articles.length === 0 && (
        <div className="nm-state">
          <div className="text-center">
            <h5 className="mb-2">
              {isSearchMode ? "No results" : "No articles found"}
            </h5>
            <p className="text-body-secondary mb-0">
              {isSearchMode
                ? query
                  ? `No results found for "${query}". Try a different keyword.`
                  : "Type a keyword and press Enter."
                : "Try another category or refresh."}
            </p>
          </div>
        </div>
      )}

      <div className="row g-4 my-3">
        {loading
          ? renderSkeletons()
          : articles.map((element, index) => (
              <div
                className="col-12 col-sm-6 col-lg-4"
                key={element?.url || `${element?.publishedAt || "na"}-${index}`}
              >
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                  badgeText={badgeText}
                />
              </div>
            ))}
      </div>

      <div className="container d-flex align-items-center justify-content-between gap-3">
        <button
          type="button"
          disabled={!canGoPrev}
          className="btn btn-dark"
          onClick={handlePreviousClick}
        >
          ← Previous
        </button>

        <div className="text-center small text-body-secondary flex-grow-1">
          {totalPages > 0 ? `Page ${page} of ${totalPages}` : ""}
        </div>

        <button
          disabled={!canGoNext}
          type="button"
          className="btn btn-dark"
          onClick={handleNextClick}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default News;
