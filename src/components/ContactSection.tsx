
import { useState, useRef } from "react";
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { Send, Mail, MapPin, Linkedin, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from '@emailjs/browser';

const ContactSection = () => {
  const titleRef = useAnimateOnScroll();
  const formRef = useAnimateOnScroll();
  const infoRef = useAnimateOnScroll();
  const emailFormRef = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!emailFormRef.current) return;
    
    setIsSubmitting(true);
    
    // Send email using EmailJS
    emailjs.sendForm(
      'service_lj6yzea', // Replace with your EmailJS service ID
      'template_8q3rfpn', // Replace with your EmailJS template ID
      emailFormRef.current,
      'UMc8hPiOC-L06AZm1' // Replace with your EmailJS public key
    )
      .then((result) => {
        console.log('Email sent successfully:', result.text);
        setIsSubmitting(false);
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you soon.",
        });
      })
      .catch((error) => {
        console.error('Failed to send email:', error.text);
        setIsSubmitting(false);
        toast.error("Failed to send message", {
          description: "Please try again or contact me directly via email.",
        });
      });
  };

  return (
    <section id="contact" className="section-container py-24 bg-secondary/30">
      <h2 ref={titleRef} className="section-title gradient-text">
        Get In Touch
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form */}
        <div ref={formRef} className="card bg-card/50 backdrop-blur-sm">
          <h3 className="text-2xl font-display font-bold mb-6">Send a Message</h3>
          
          <form ref={emailFormRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Your Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="How can I help you?"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                rows={5}
                required
              />
            </div>
            
            <Button type="submit" className="button-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                  Sending...
                </>
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </>
              )}
            </Button>
          </form>
        </div>
        
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
            <h3 className="text-xl font-display font-bold mb-4">Connect With Me</h3>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/in/shayoun-bhaduri"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-card rounded-full hover:bg-primary hover:text-white transition-colors"
                aria-label="LinkedIn profile"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/bhadurishayoun"
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-card rounded-full hover:bg-primary hover:text-white transition-colors"
                aria-label="GitHub profile"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
