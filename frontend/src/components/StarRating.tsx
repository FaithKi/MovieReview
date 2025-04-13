import { useState } from "react";
import { StarIcon as SolidStar } from "@heroicons/react/24/solid";
import { StarIcon as OutlineStar } from "@heroicons/react/24/outline";
import { StarRatingProps } from "../type";

const StarRating: React.FC<StarRatingProps> = ({ value, onChange, size = 24 }) => {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = hover !== null ? star <= hover : star <= value;

        return (
          <button
            key={star}
            onClick={() => onChange(star === value ? null : star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            className="transition-transform hover:scale-110 active:scale-95"
            aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
          >
            {filled ? (
              <SolidStar
                className="text-yellow-400 drop-shadow-sm"
                style={{ width: size, height: size }}
              />
            ) : (
              <OutlineStar
                className="text-yellow-400"
                style={{ width: size, height: size }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
