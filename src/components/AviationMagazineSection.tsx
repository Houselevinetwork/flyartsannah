import { Button } from "@/components/ui/button";
import { BookOpen, ArrowRight } from "lucide-react";
import { useState } from "react";
import ArticleModal from "./ArticleModal";

const AviationMagazineSection = () => {
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleArticleClick = (article: any) => {
    setSelectedArticle(article);
    setIsModalOpen(true);
  };

  const articles = [
    {
      id: 1,
      title: "The Future of Sustainable Aviation",
      excerpt: "Exploring how electric aircraft and sustainable fuels are revolutionizing the aviation industry.",
      image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      category: "Innovation",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "Luxury Safari Experiences from Above",
      excerpt: "Discover Africa's hidden gems through our exclusive helicopter and balloon safari packages.",
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Adventure",
      readTime: "7 min read"
    },
    {
      id: 3,
      title: "Private Jet Interior Design Trends",
      excerpt: "The latest in luxury aircraft interiors: from minimalist elegance to maximalist opulence.",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
      category: "Lifestyle",
      readTime: "6 min read"
    },
    {
      id: 4,
      title: "Aerial Photography Masterclass",
      excerpt: "Professional tips for capturing stunning aerial shots that tell compelling stories.",
      image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Photography",
      readTime: "8 min read"
    },
    {
      id: 5,
      title: "The Art of Bush Flying in Africa",
      excerpt: "Stories from experienced pilots navigating Africa's most challenging and remote airstrips.",
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Adventure",
      readTime: "10 min read"
    },
    {
      id: 6,
      title: "Exclusive Aircraft Collections",
      excerpt: "Inside the world's most prestigious private aircraft collections and their fascinating histories.",
      image: "https://images.unsplash.com/photo-1583884952012-b9894b1c62e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      category: "Luxury",
      readTime: "9 min read"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 mb-6">
            <BookOpen className="w-12 h-12 text-[#DEC39B]" />
            <h2 className="text-white text-5xl md:text-6xl font-light">
              Aviation <span className="text-[#DEC39B]">Magazine</span>
            </h2>
          </div>
          <p className="text-white/80 text-xl max-w-3xl mx-auto leading-relaxed">
            Immerse yourself in the world of luxury aviation with our curated collection 
            of stories, insights, and experiences from the skies.
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <div 
            className="relative h-96 md:h-[500px] rounded-3xl overflow-hidden group cursor-pointer"
            onClick={() => handleArticleClick(articles[0])}
          >
            <img 
              src={articles[0].image}
              alt={articles[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex items-center space-x-4 mb-4">
                <span className="px-3 py-1 bg-[#B08747] text-white text-sm rounded-full">
                  {articles[0].category}
                </span>
                <span className="text-white/70 text-sm">{articles[0].readTime}</span>
              </div>
              <h3 className="text-white text-3xl md:text-4xl font-bold mb-4 leading-tight">
                {articles[0].title}
              </h3>
              <p className="text-white/90 text-lg mb-6 max-w-2xl">
                {articles[0].excerpt}
              </p>
              <Button 
                className="bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-black transition-all duration-300"
                onClick={(e) => {
                  e.stopPropagation();
                  handleArticleClick(articles[0]);
                }}
              >
                Read Article <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article) => (
            <div 
              key={article.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 cursor-pointer"
              onClick={() => handleArticleClick(article)}
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#DEC39B] text-sm">{article.readTime}</span>
                </div>
                <h4 className="text-white text-xl font-semibold mb-3 group-hover:text-[#DEC39B] transition-colors">
                  {article.title}
                </h4>
                <p className="text-white/70 text-sm leading-relaxed">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">

        </div>
      </div>

      {/* Article Modal */}
      <ArticleModal 
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

export default AviationMagazineSection;