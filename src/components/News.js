import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

const News=(props)=> {

  const [articles, setArticles] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)
  const [error, setError] = useState(null)
     

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  const buildUrl = (pageNumber) =>
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}&page=${pageNumber}&pageSize=${props.pageSize}`;

  const fetchNews = async (pageNumber, options = {}) => {
    if (!apiKey) {
      setError('Missing API key. Set REACT_APP_NEWS_API_KEY in a .env file, then restart the dev server.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await fetch(buildUrl(pageNumber), options);
      const parsedData = await data.json();

      if (!data.ok) {
        throw new Error(parsedData?.message || `Request failed (${data.status})`);
      }
      if (parsedData?.status && parsedData.status !== "ok") {
        throw new Error(parsedData?.message || "Failed to load news.");
      }

      setArticles(Array.isArray(parsedData?.articles) ? parsedData.articles : []);
      setTotalResults(Number(parsedData?.totalResults) || 0);
      setPage(pageNumber);
    } catch (err) {
      if (err?.name !== "AbortError") {
        setError(err?.message || "Failed to load news.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePreviousClick = async() => {
    const previousPage = page - 1;
    if (previousPage < 1) return;
    await fetchNews(previousPage);
  };

  const handleNextClick = async () => {
    const nextPage = page + 1;
    if (nextPage > Math.ceil(totalResults / props.pageSize)) return;
    await fetchNews(nextPage);
}

  useEffect(() => {
    const controller = new AbortController();
    fetchNews(1, { signal: controller.signal });
    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pageSize]);
    return (
      <div className="container">
        <h1 className="text-center">Top Headlines</h1>
        {loading&&<Spinner/>}
        {!loading && error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}
        <div className="row g-4 my-3">
          {!loading&&articles.map((element, index) => {
            return (
              <div className="col-12 col-sm-6 col-lg-4" key={element?.url || `${element?.publishedAt || 'na'}-${index}`}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imgUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            type="button"
            disabled={page <= 1}
            className="btn btn-dark"
            onClick={handlePreviousClick}
          >
            &larr; Previous
          </button>
          <button
          disabled={page+1>Math.ceil(totalResults/props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }

export default News;
