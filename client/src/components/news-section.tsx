import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import type { News } from "@shared/schema";

export default function NewsSection() {
  const { data: news, isLoading } = useQuery<News[]>({
    queryKey: ["/api/news"],
  });

  if (isLoading) {
    return (
      <section id="news" className="py-12 sm:py-16 md:py-20 bg-[hsl(215,25%,27%)]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">Latest News</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">Loading news...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="py-12 sm:py-16 md:py-20 bg-[hsl(215,25%,27%)]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 glow-text">Latest News</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed px-4">
            Stay updated with team announcements and gaming news.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {news?.map((article) => (
            <Card key={article.id} className="neon-border overflow-hidden hover-glow transition-all bg-transparent group">
              <img 
                src={article.imageUrl} 
                alt={article.title}
                className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <CardContent className="p-4 sm:p-6">
                <span className="text-[hsl(185,84%,44%)] text-xs sm:text-sm font-medium">{article.publishedAt}</span>
                <h3 className="text-lg sm:text-xl font-bold mb-2 text-[hsl(180,100%,50%)] leading-tight">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base mb-4 leading-relaxed line-clamp-3">{article.excerpt}</p>
                <button className="text-[hsl(185,84%,44%)] hover:text-[hsl(180,100%,50%)] transition-colors text-sm sm:text-base font-medium">
                  Read More →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
