
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-display font-bold gradient-text">SB</span>
          </div>
          
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-foreground/80">
              © {currentYear} Shayoun Bhaduri. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center text-sm text-foreground/70">
            Made with <Heart className="h-4 w-4 mx-1 text-primary" /> using React & TailwindCSS
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
