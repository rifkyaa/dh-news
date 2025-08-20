const SkeletonCard = () => {
  return (
    <div className="bg-white rounded-lg p-4 shadow animate-pulse">
        <div className="h-40 bg-gray-300 rounded-xl mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
    </div>
  )
}

export default SkeletonCard