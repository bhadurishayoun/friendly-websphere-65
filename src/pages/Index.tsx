
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ProjectsSection from "@/components/ProjectsSection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "sonner";

const Index = () => {
  useEffect(() => {
    // Add animation observers for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll(".animate-on-scroll").forEach((el) => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll(".animate-on-scroll").forEach((el) => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navbar />
        
        <main>
          <div id="home">
            <HeroSection />
          </div>
          <div id="about">
            <AboutSection />
          </div>
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="blog">
            <BlogSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </main>
        
        <Footer />
        <Chatbot />
        <Toaster position="top-right" />
      </div>
    </ThemeProvider>
  );
};

export default Index;
