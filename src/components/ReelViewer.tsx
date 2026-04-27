import { useState, useRef, useEffect } from "react";
import { X, Heart, Bookmark, Share2, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Reel {
  id: number;
  image: string;
  video: string;
  title: string;
  creator: string;
  category: string;
  likes: number;
}

interface ReelViewerProps {
  reels: Reel[];
  initialIndex: number;
  onClose: () => void;
}

const ReelViewer = ({ reels, initialIndex, onClose }: ReelViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const isScrolling = useRef(false);

  const currentReel = reels[currentIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowUp" && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsLiked(false);
        setIsSaved(false);
      }
      if (e.key === "ArrowDown" && currentIndex < reels.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsLiked(false);
        setIsSaved(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, reels.length, onClose]);

  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    if (isScrolling.current) return;

    if (e.deltaY > 0 && currentIndex < reels.length - 1) {
      isScrolling.current = true;
      setCurrentIndex(currentIndex + 1);
      setIsLiked(false);
      setIsSaved(false);
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    } else if (e.deltaY < 0 && currentIndex > 0) {
      isScrolling.current = true;
      setCurrentIndex(currentIndex - 1);
      setIsLiked(false);
      setIsSaved(false);
      setTimeout(() => {
        isScrolling.current = false;
      }, 500);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    }
  }, [currentIndex, reels.length]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY.current - touchEndY;

    if (Math.abs(diff) > 50) {
      if (diff > 0 && currentIndex < reels.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsLiked(false);
        setIsSaved(false);
      } else if (diff < 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsLiked(false);
        setIsSaved(false);
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-black z-50 flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <Button
        onClick={onClose}
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-50 text-white hover:bg-white/20"
      >
        <X className="w-6 h-6" />
      </Button>

      {/* Video */}
      <video
        ref={videoRef}
        src={currentReel.video}
        className="h-full w-auto max-w-full object-contain"
        loop
        muted={isMuted}
        playsInline
        autoPlay
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Bottom Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-auto">
          <div className="max-w-lg">
            <div className="mb-2">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                {currentReel.category}
              </span>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">{currentReel.title}</h3>
            <p className="text-white/90 text-sm">by {currentReel.creator}</p>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="absolute right-6 bottom-24 flex flex-col gap-4 pointer-events-auto">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Heart
                className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
              />
            </div>
            <span className="text-white text-xs font-medium">
              {currentReel.likes + (isLiked ? 1 : 0)}
            </span>
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Bookmark
                className={`w-6 h-6 ${isSaved ? "fill-white text-white" : "text-white"}`}
              />
            </div>
          </button>

          <button className="flex flex-col items-center gap-1">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              <Share2 className="w-6 h-6 text-white" />
            </div>
          </button>

          <button
            onClick={() => setIsMuted(!isMuted)}
            className="flex flex-col items-center gap-1"
          >
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors">
              {isMuted ? (
                <VolumeX className="w-6 h-6 text-white" />
              ) : (
                <Volume2 className="w-6 h-6 text-white" />
              )}
            </div>
          </button>
        </div>

        {/* Navigation Hints */}
        {currentIndex > 0 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full text-white/50 text-sm pointer-events-none">
            ↑ Previous
          </div>
        )}
        {currentIndex < reels.length - 1 && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-full text-white/50 text-sm pointer-events-none">
            ↓ Next
          </div>
        )}
      </div>
    </div>
  );
};

export default ReelViewer;