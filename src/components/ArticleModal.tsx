import { X, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  readTime: string;
  content?: string;
}

interface ArticleModalProps {
  article: Article | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArticleModal = ({ article, isOpen, onClose }: ArticleModalProps) => {
  if (!isOpen || !article) return null;

  // Sample full article content
  const fullContent = `
    <p class="mb-4">
      ${article.excerpt}
    </p>
    
    <h3 class="text-2xl font-bold text-white mb-4 mt-8">Introduction</h3>
    <p class="mb-4">
      The aviation industry is undergoing a remarkable transformation, driven by technological innovation 
      and a growing commitment to sustainability. From electric aircraft to sustainable aviation fuels, 
      the future of flight is being reimagined.
    </p>
    
    <h3 class="text-2xl font-bold text-white mb-4 mt-8">Key Developments</h3>
    <p class="mb-4">
      Major airlines and aerospace manufacturers are investing billions in research and development to 
      create cleaner, more efficient aircraft. Electric propulsion systems are no longer just concepts 
      but are entering the testing and certification phases.
    </p>
    
    <p class="mb-4">
      Sustainable Aviation Fuel (SAF) is another critical component of the industry's decarbonization 
      strategy. Made from renewable sources such as waste oils, agricultural residues, and even carbon 
      captured from the atmosphere, SAF can reduce lifecycle carbon emissions by up to 80%.
    </p>
    
    <h3 class="text-2xl font-bold text-white mb-4 mt-8">The Road Ahead</h3>
    <p class="mb-4">
      While challenges remain—including infrastructure development, regulatory frameworks, and cost 
      considerations—the momentum is undeniable. Industry leaders predict that by 2050, we'll see 
      a significant portion of commercial flights powered by sustainable alternatives.
    </p>
    
    <p class="mb-4">
      The journey toward sustainable aviation is not just about technology; it's about reimagining 
      our relationship with air travel and our planet. As we soar into this new era, the sky is 
      no longer the limit—it's the beginning of a cleaner, greener future.
    </p>
  `;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1B2932] via-[#2E4755] to-[#1B2932] rounded-2xl shadow-2xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>
        
        {/* Hero Image */}
        <div className="relative h-64 md:h-96 overflow-hidden rounded-t-2xl">
          <img 
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2932] via-transparent to-transparent" />
        </div>
        
        {/* Article Content */}
        <div className="p-6 md:p-10">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center space-x-2">
              <Tag className="w-4 h-4 text-[#DEC39B]" />
              <span className="text-[#DEC39B] text-sm font-medium">{article.category}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4 text-white/60" />
              <span className="text-white/60 text-sm">{article.readTime}</span>
            </div>
          </div>
          
          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {article.title}
          </h1>
          
          {/* Article Body */}
          <div 
            className="prose prose-invert max-w-none text-white/80 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: fullContent }}
          />
          
          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-10 pt-6 border-t border-white/20">
            <Button 
              className="bg-gradient-to-r from-[#B08747] to-[#DEC39B] text-white hover:shadow-lg"
              onClick={onClose}
            >
              Close Article
            </Button>
            <Button 
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              Share Article
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleModal;