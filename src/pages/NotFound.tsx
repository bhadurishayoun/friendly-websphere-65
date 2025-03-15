
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeProvider } from "@/components/ThemeProvider";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center bg-secondary/30 p-4">
        <div className="text-center max-w-md bg-card rounded-2xl shadow-xl p-8 border border-border/40">
          <h1 className="text-6xl font-display font-bold mb-4 gradient-text">404</h1>
          <p className="text-xl font-medium mb-6 text-foreground/90">Oops! Page not found</p>
          <p className="text-muted-foreground mb-8">The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
          
          <Button asChild className="button-primary">
            <a href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Return to Home
            </a>
          </Button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default NotFound;
