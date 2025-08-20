const API_KEY_GNEWS = import.meta.env.VITE_GNEWS_API_KEY;
const API_KEY_NEWSAPI = import.meta.env.VITE_NEWSAPI_KEY;
const API_KEY_NYTIMESAPI = import.meta.env.VITE_NYTIMESAPI_KEY;

export const fetchGNews = async (keyword) => {
  const res = await fetch(
    `https://gnews.io/api/v4/search?q=${keyword}&lang=en&token=${API_KEY_GNEWS}`
  );
  const data = await res.json();
  return (
    data.articles?.map((a) => ({
      title: a.title,
      description: a.description,
      url: a.url,
      image: a.image,
      publishedAt: a.publishedAt,
      source: "GNews",
    })) || []
  );
};

export const fetchNewsAPI = async (keyword) => {
  try {
    let res;

    if (import.meta.env.DEV) {
      // Dev: boleh direct (biasanya CORS di localhost diperbolehkan)
      const API_KEY_NEWSAPI = import.meta.env.VITE_NEWSAPI_KEY;
      res = await fetch(
        `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&language=en&apiKey=${API_KEY_NEWSAPI}`
      );
    } else {
      // Prod: lewat serverless function (tidak expose key)
      res = await fetch(`/api/newsapi?q=${encodeURIComponent(keyword)}`);
    }

    const data = await res.json();

    // Jika NewsAPI balikin error object
    if (data?.status === "error") {
      console.error("NewsAPI error:", data);
      return [];
    }

    return (
      data.articles?.slice(0, 10).map((a) => ({
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        publishedAt: a.publishedAt,
        source: "NewsAPI",
      })) || []
    );
  } catch (e) {
    console.error("fetchNewsAPI failed:", e);
    return [];
  }
};


export const fetchNyTimesApi = async (keyword) => {
  const res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${keyword}&api-key=${API_KEY_NYTIMESAPI}`
  );
  const data = await res.json();

  return (
    data.response.docs
      ?.slice(0, 10)
      .map((a) => ({
        title: a.headline?.main,
        description: a.abstract,
        url: a.web_url,
        image: a.multimedia?.[0]
          ? `https://www.nytimes.com/${a.multimedia[0].url}`
          : null,
        publishedAt: a.pub_date,
        source: "New York Times",
      })) || []
  );
};

export const fetchAllNews = async (keyword) => {
  const [gnews, newsapi, nytimes] = await Promise.all([
    fetchGNews(keyword),
    fetchNewsAPI(keyword),
    fetchNyTimesApi(keyword),
  ]);

  return [...gnews, ...newsapi, ...nytimes].sort(
    (a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)
  );
};
