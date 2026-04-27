import { useState } from "react";
import { Plane, MapPin, Palmtree, Palette, Sparkles } from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const categories: Category[] = [
  { id: "all", name: "All", icon: <Sparkles className="w-4 h-4" /> },
  { id: "aviation", name: "Aviation", icon: <Plane className="w-4 h-4" /> },
  { id: "destinations", name: "Destinations", icon: <MapPin className="w-4 h-4" /> },
  { id: "wildlife", name: "Wildlife", icon: <Palmtree className="w-4 h-4" /> },
  { id: "portfolio", name: "Sannah's Portfolio", icon: <Palette className="w-4 h-4" /> },
];

interface CategoryFilterProps {
  onCategoryChange?: (category: string) => void;
}

const CategoryFilter = ({ onCategoryChange }: CategoryFilterProps) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = (categoryId: string) => {
    setActiveCategory(categoryId);
    onCategoryChange?.(categoryId);
  };

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`
            flex items-center gap-2 px-6 py-3 rounded-full font-medium
            transition-all duration-300
            ${
              activeCategory === category.id
                ? "bg-accent text-accent-foreground shadow-lg scale-105"
                : "bg-card text-card-foreground hover:bg-muted hover:scale-105"
            }
          `}
        >
          {category.icon}
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;