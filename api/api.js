export default async function handler(req, res) {
  const { q, page = 1, pageSize = 6, category } = req.query;

  const apiKey = process.env.REACT_APP_NEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: "API key missing" });
  }

  let url = "";

  if (q) {
    url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(
      q
    )}&page=${page}&pageSize=${pageSize}&language=en&sortBy=publishedAt&apiKey=${apiKey}`;
  } else {
    url = `https://newsapi.org/v2/top-headlines?country=us${
      category ? `&category=${category}` : ""
    }&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
  }

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch news" });
  }
}
