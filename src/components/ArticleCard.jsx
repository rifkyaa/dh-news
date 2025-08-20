const ArticleCard = ({ article }) => {
  return (
    <div className="relative bg-white shadow rounded-lg p-4 hover:shadow-md transition ">
        <span className="absolute top-6 left-6 inline-block text-xs px-2 py-1 rounded-full bg-[#c3f465] text-gray-700 mb-2">
            {article.source}
        </span>
        <img
            src={article.image ? article.image : "/noImage.png"}
            alt={article.title}
            className="w-full h-56 2xl:h-72 object-cover rounded-md mb-3"
            onError={(e) => {
            e.currentTarget.src = "/noImage.png";
            }}
        />

        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-slate-900 hover:underline"
        >
            {article.title}
        </a>

        <p className="text-sm text-gray-500 mt-1">
            {new Date(article.publishedAt).toLocaleString()}
        </p>

        <p className="mt-2 text-gray-700">
            {article.description && article.description !== "Keywords"
            ? article.description
            : "No description available."}
        </p>
    </div>
  );
};

export default ArticleCard;
