import React from "react";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="container mx-auto px-6 lg:px-8 py-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, idx) => (
          <div key={idx} className="animate-pulse flex flex-col space-y-4">
            <div className="h-48 bg-gray-300 rounded-lg" />
            <div className="h-6 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
