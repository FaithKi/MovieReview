import { useState } from "react";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { StarRatingProps } from "../type";

const StarRating: React.FC<StarRatingProps> = ({ value, onChange }) => {
  const [hover, setHover] = useState<number | null>(null);
  const current = hover ?? value;

  return (
    <div className="flex gap-1 text-primary-500">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
        <div
          key={star}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          onClick={() => onChange(star === value ? null : star)}
          className="cursor-pointer"
        >
          {current >= star ? (
            <SolidStar className="w-6 h-6 " />
          ) : (
            <OutlineStar className="w-6 h-6 text-primary-400" />
          )}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
