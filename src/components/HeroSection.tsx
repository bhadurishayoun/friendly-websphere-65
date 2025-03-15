
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";

const HeroSection = () => {
  const headingRef = useAnimateOnScroll();
  const subheadingRef = useAnimateOnScroll();
  const introRef = useAnimateOnScroll();
  const socialRef = useAnimateOnScroll();

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center items-center py-20 overflow-hidden">
      <div className="absolute inset-0 bg-dots-pattern opacity-20"></div>
      <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-theme-purple/10 rounded-full filter blur-3xl"></div>
      
      <div className="max-w-4xl mx-auto px-4 text-center z-10">
        <h1 ref={headingRef} className="text-4xl md:text-6xl font-display font-bold mb-4 gradient-text">
          Shayoun Bhaduri
        </h1>
        
        <h2 ref={subheadingRef} className="text-xl md:text-2xl font-medium text-foreground/90 mb-8">
          Data Science | AI | Research | Consulting
        </h2>
        
        <p ref={introRef} className="text-lg mb-10 text-foreground/80 max-w-3xl mx-auto">
          Hi, I'm Shayoun Bhaduri, an AI-driven problem solver with expertise in Data Science, Machine Learning, and Business Consulting. Passionate about technology, research, and innovation, I strive to bridge the gap between AI and real-world applications.
        </p>
        
        <div ref={socialRef} className="flex justify-center space-x-4 mb-12">
          <a 
            href="mailto:mb24043@students.iitmandi.ac.in" 
            className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
          <a 
            href="https://linkedin.com/in/shayoun-bhaduri" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a 
            href="https://github.com/bhadurishayoun" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
        </div>
        
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <a 
            href="#about" 
            className="p-3 rounded-full bg-secondary hover:bg-primary hover:text-white transition-colors"
            aria-label="Scroll down"
          >
            <ArrowDown className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
