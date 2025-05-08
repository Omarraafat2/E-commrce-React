interface Props {
    rating: number;
    count: number;
  }
  
  export default function RatingStars({ rating, count }: Props) {
    return (
      <div className="flex items-center gap-2 mb-4">
        <span className="text-yellow-500">⭐ {rating.toFixed(1)}</span>
        <span className="text-sm text-gray-500">({count} reviews)</span>
      </div>
    );
  }
  