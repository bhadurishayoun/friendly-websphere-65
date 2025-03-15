
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

type BlogPost = {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  url: string;
  category: string;
};

const blogPosts: BlogPost[] = [
  {
    title: "AI-driven Fraud Detection Models: A Comprehensive Guide",
    excerpt: "Learn how machine learning models can be leveraged to detect and prevent financial fraud with high accuracy rates.",
    date: "April 15, 2024",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#",
    category: "AI",
  },
  {
    title: "Power BI vs. Tableau: Data Visualization for Decision Making",
    excerpt: "A comparative analysis of two leading data visualization tools and their impact on business decision-making processes.",
    date: "March 22, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1543286386-713bdd548da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#",
    category: "Data Visualization",
  },
  {
    title: "Business Analytics Case Study: Retail Optimization with Machine Learning",
    excerpt: "How a retail chain improved inventory management and sales forecasting using predictive analytics models.",
    date: "February 10, 2024",
    readTime: "10 min read",
    image: "https://images.unsplash.com/photo-1582481946466-8c2247da81c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    url: "#",
    category: "Business Analytics",
  },
];

const BlogSection = () => {
  const titleRef = useAnimateOnScroll();
  const descriptionRef = useAnimateOnScroll();
  
  return (
    <section id="blog" className="section-container py-24">
      <h2 ref={titleRef} className="section-title gradient-text">
        Blog
      </h2>
      
      <p ref={descriptionRef} className="text-center text-lg mb-12 max-w-3xl mx-auto text-foreground/80">
        Insights and thoughts on AI, data science, and business analytics. I regularly write about topics that interest me and share my knowledge with the community.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => {
          const postRef = useAnimateOnScroll();
          return (
            <article key={index} ref={postRef} className="card group overflow-hidden flex flex-col h-full">
              <div className="relative overflow-hidden rounded-lg h-48 mb-6">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 flex flex-col">
                <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <div className="flex items-center mr-4">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-medium mb-3">{post.title}</h3>
                <p className="text-foreground/80 mb-4 flex-1">{post.excerpt}</p>
                
                <div className="mt-auto">
                  <Button variant="ghost" className="p-0 h-auto text-primary hover:text-primary/90 hover:bg-transparent group">
                    <span>Read more</span>
                    <ArrowRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
      
      <div className="mt-10 text-center">
        <Button className="button-primary">
          View All Posts
        </Button>
      </div>
    </section>
  );
};

export default BlogSection;
