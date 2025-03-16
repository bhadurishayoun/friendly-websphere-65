
import { useState } from "react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { Mail, MapPin, Linkedin, Github } from "lucide-react";

const ContactSection = () => {
  const titleRef = useAnimateOnScroll();
  const infoRef = useAnimateOnScroll();
  
  return (
    <section id="contact" className="section-container py-24 bg-secondary/30">
      <h2 ref={titleRef} className="section-title gradient-text">
        Get In Touch
      </h2>
      
      <div className="max-w-4xl mx-auto">
        {/* Contact Information */}
        <div ref={infoRef} className="space-y-10">
          <div>
            <h3 className="text-2xl font-display font-bold mb-6">Contact Information</h3>
            <p className="text-foreground/80 mb-8">
              Feel free to reach out to me for collaborations, opportunities, or just to say hello. I'm always open to discussing new projects and ideas.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Email</h4>
                  <a
                    href="mailto:mb24043@students.iitmandi.ac.in"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    mb24043@students.iitmandi.ac.in
                  </a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-full">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium mb-1">Location</h4>
                  <p className="text-muted-foreground">
                    IIT Mandi, Himachal Pradesh, India
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Let's Connect</h3>
            <div className="flex flex-wrap gap-6">
              <a
                href="mailto:mb24043@students.iitmandi.ac.in"
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-lg hover:bg-primary hover:text-white transition-colors"
                aria-label="Email contact"
              >
                <Mail className="h-5 w-5" />
                <span>Email Me</span>
              </a>
              
              <a
                href="https://linkedin.com/in/shayoun-bhaduri"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-lg hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
                <span>LinkedIn</span>
              </a>
              
              <a
                href="https://github.com/bhadurishayoun"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-3 bg-card rounded-lg hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
                <span>GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
