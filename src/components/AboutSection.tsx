
import { useAnimateOnScroll } from "@/hooks/useAnimateOnScroll";
import { BookOpen, BrainCircuit, LucideIcon, School, Briefcase, Code } from "lucide-react";

type SkillItem = {
  name: string;
  level: number; // 1-10
  category: "technical" | "data" | "tools" | "soft";
};

const skills: SkillItem[] = [
  { name: "Python", level: 9, category: "technical" },
  { name: "Machine Learning", level: 8, category: "technical" },
  { name: "SQL", level: 8, category: "technical" },
  { name: "EDA", level: 9, category: "data" },
  { name: "Power BI", level: 8, category: "tools" },
  { name: "Agile", level: 7, category: "soft" },
  { name: "Jira", level: 7, category: "tools" },
  { name: "IBM Cloud", level: 6, category: "tools" },
  { name: "Hadoop", level: 6, category: "technical" },
  { name: "Data Visualization", level: 9, category: "data" },
];

type ExperienceItem = {
  title: string;
  company: string;
  duration: string;
  description: string;
  icon: LucideIcon;
};

const experiences: ExperienceItem[] = [
  {
    title: "Founder's Office Intern",
    company: "Pync",
    duration: "Nov 2024 - Present",
    description: "Providing product insights and driving strategic changes in a startup environment.",
    icon: Briefcase,
  },
  {
    title: "Summer Research Intern",
    company: "IIT BHU",
    duration: "May 2023 - Jul 2023",
    description: "Worked on deep learning models for person re-identification and privacy protection.",
    icon: BrainCircuit,
  },
  {
    title: "Data Analytics Intern",
    company: "GUESSS India",
    duration: "Oct 2024 - Present",
    description: "Leveraging Power BI and Tableau for insightful analytics.",
    icon: Code,
  },
];

type EducationItem = {
  degree: string;
  institution: string;
  duration: string;
  description: string;
  icon: LucideIcon;
};

const education: EducationItem[] = [
  {
    degree: "MBA (Data Science & AI)",
    institution: "IIT Mandi",
    duration: "2024 - Present",
    description: "Focusing on advanced AI applications in business contexts.",
    icon: School,
  },
  {
    degree: "BTech (Data Science & AI)",
    institution: "SRM University, Lucknow",
    duration: "2020 - 2024",
    description: "Specialized in machine learning and data engineering.",
    icon: BookOpen,
  },
];

const AboutSection = () => {
  const titleRef = useAnimateOnScroll();
  const skillsRef = useAnimateOnScroll();
  const experienceRef = useAnimateOnScroll();
  const educationRef = useAnimateOnScroll();

  return (
    <section id="about" className="section-container py-24">
      <h2 ref={titleRef} className="section-title gradient-text">
        About Me
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Skills Column */}
        <div ref={skillsRef} className="space-y-6">
          <h3 className="text-2xl font-display font-bold mb-6">Skills</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skills.map((skill, index) => (
              <div key={index} className="bg-card rounded-lg p-4 border border-border/50">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                    {skill.category}
                  </span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-1000"
                    style={{ width: `${skill.level * 10}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Experience and Education Column */}
        <div className="space-y-8">
          <div ref={experienceRef} className="space-y-6">
            <h3 className="text-2xl font-display font-bold mb-6">Experience</h3>
            
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <exp.icon className="h-6 w-6 text-primary" />
                    </div>
                    {index < experiences.length - 1 && (
                      <div className="absolute top-12 bottom-0 left-6 w-0.5 bg-border"></div>
                    )}
                  </div>
                  
                  <div className="pb-6">
                    <h4 className="text-lg font-medium">{exp.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.duration}</span>
                    </div>
                    <p className="text-foreground/80">{exp.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div ref={educationRef} className="space-y-6">
            <h3 className="text-2xl font-display font-bold mb-6">Education</h3>
            
            <div className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="flex gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                      <edu.icon className="h-6 w-6 text-primary" />
                    </div>
                    {index < education.length - 1 && (
                      <div className="absolute top-12 bottom-0 left-6 w-0.5 bg-border"></div>
                    )}
                  </div>
                  
                  <div className="pb-6">
                    <h4 className="text-lg font-medium">{edu.degree}</h4>
                    <div className="flex items-center text-sm text-muted-foreground mb-2">
                      <span>{edu.institution}</span>
                      <span className="mx-2">•</span>
                      <span>{edu.duration}</span>
                    </div>
                    <p className="text-foreground/80">{edu.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
