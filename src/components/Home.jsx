import { useEffect, useState } from "react";
import { fetchAllNews, fetchGNews, fetchNewsAPI, fetchNyTimesApi } from "../services/newsService";
import ArticleCard from "./ArticleCard"; 
import newsGIF from "../../public/newsGIF.gif"
import SkeletonCard from "./SkeletonCard";

const Home = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("AI");
  const [filter, setFilter] = useState("all");
  const [visible, setVisible] = useState(6);

  const getNews = async (keyword, source = filter) => {
    setLoading(true);
    let results = [];

    if (source === "all") {
      results = await fetchAllNews(keyword);
    } else if (source === "gnews") {
      results = await fetchGNews(keyword);
    } else if (source === "newsapi") {
      results = await fetchNewsAPI(keyword);
    } else if (source === "nytimes") {
      results = await fetchNyTimesApi(keyword);
    }

    setNews(results);
    setLoading(false);
    setVisible(6);
  };

  useEffect(() => {
    getNews(query, filter);
  }, [filter]);

  const handleSearch = (e) => {
    e.preventDefault();
    getNews(query, filter);
  };

  const handleLoadMore = () => {
    setVisible((prev) => prev + 6);
  };

  return (
    <div className="py-6 px-6 md:px-10 lg:px-12 2xl:px-28">
        <div className="flex flex-col items-center justify-center gap-4 h-[50vh] mb-20">
            <img src={newsGIF} width={200} height={200} alt="gif"/>
            <h1 className="text-6xl md:text-8xl text-center">Stay <span className="px-1.5 bg-[linear-gradient(to_bottom,transparent_50%,#c2f564_50%)]">Informed</span>, Stay <span className="px-1.5 bg-[linear-gradient(to_bottom,transparent_50%,#c2f564_50%)]">Ahead</span></h1>
            <p className="text-[1rem] md:text-lg text-center text-gray-500" >Kabar terkini dari berbagai sumber terpercaya, semuanya dalam satu tempat.</p>
        </div>

        <div className="flex flex-col gap-3.5 md:flex-row justify-between items-center mb-6 pt-10">
            <form onSubmit={handleSearch} className="flex justify-between gap-2 w-full md:w-auto">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search news..."
                    className="w-full md:w-64 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c2f564]"
                />
                <button
                    type="submit"
                    className="bg-[#c2f564] text-slate-900 px-4 py-2 rounded-lg hover:bg-[#abd856] transition"
                >
                    Search
                </button>
            </form>

            <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full md:w-64 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-[#c2f564]"
                >
                <option value="all">All Sources</option>
                <option value="gnews">GNews</option>
                <option value="newsapi">NewsAPI</option>
                <option value="nytimes">New York Times</option>
            </select>
        </div>

      {loading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : news.length === 0 ? (
        <p className="text-center text-gray-500">No articles found.</p>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {news.slice(0, visible).map((article, index) => (
              <ArticleCard key={index} article={article} />
            ))}
          </div>

          {visible < news.length && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
