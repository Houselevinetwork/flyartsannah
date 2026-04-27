import { useState } from "react";
import { Heart, Bookmark, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ReelCardProps {
  image: string;
  title: string;
  creator: string;
  category: string;
  likes?: number;
  onClick?: () => void;
}

const ReelCard = ({ image, title, creator, category, likes = 0, onClick }: ReelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div
      className="group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02]"
      style={{ boxShadow: "var(--shadow-elegant)" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />
        
        {/* Play Icon (visible on hover) */}
        {isHovered && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-accent/90 rounded-full p-4 animate-in fade-in zoom-in duration-200">
              <Play className="w-8 h-8 text-accent-foreground fill-current" />
            </div>
          </div>
        )}
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 bg-card/90 backdrop-blur-sm text-card-foreground text-xs font-semibold rounded-full">
            {category}
          </span>
        </div>
        
        {/* Actions (top right) */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsSaved(!isSaved);
            }}
            className="p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-colors"
          >
            <Bookmark
              className={`w-5 h-5 ${isSaved ? "fill-secondary text-secondary" : "text-muted-foreground"}`}
            />
          </button>
        </div>
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          <h3 className="text-white font-semibold text-lg line-clamp-2">
            {title}
          </h3>
          <p className="text-white/80 text-sm">by {creator}</p>
          
          {/* Like button */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsLiked(!isLiked);
              }}
              className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
            >
              <Heart
                className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
              />
              <span className="text-sm">{likes + (isLiked ? 1 : 0)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReelCard;