import React from 'react';
import styles from './AboutSection.module.css';

// Lucide Icons for key points
import { Gauge, ToolCase, ShieldCheck, TrendingUp } from 'lucide-react';

const missionPoints = [
    { 
        icon: Gauge, 
        title: 'Speed', 
        description: 'Rapid development without compromising quality.'
    },
    { 
        icon: ToolCase, 
        title: 'Accessibility', 
        description: 'Making advanced tools available to all developers'
    },
    { 
        icon: ShieldCheck, 
        title: 'Quality', 
        description: 'Ensuring production-ready code every time.'
    },

];

const AboutSection = () => {
  return (
    <section className={styles.aboutSection} id='about'>
      <div className={styles.container}>
        
        <div className={styles.aboutLayout}>
          
          {/* === LEFT: Core Narrative & CTA === */}
          <div className={styles.narrativeColumn}>
            <p className={styles.featureTag} data-aos="fade-down" data-aos-delay="10">
                // About Us
            </p>
            
            <h2 className={styles.headline} data-aos="fade-right" data-aos-delay="10">
                Redefining <span className={styles.highlight}>Enterprise IT</span> for the Next Decade.
            </h2>
            
            <p className={styles.description} data-aos="fade-up" data-aos-delay="10">
          EnProSys Infotech is a leading software development and IT consulting company delivering enterprise-grade digital solutions powered by modern technology and AI. Backed by an experienced team, we have established a strong global presence across the USA, UK, China, and beyond.
           
            </p>
            
            {/* <a href="/contact" className={styles.primaryCta} data-aos="fade-up" data-aos-delay="700">
                Discover Our Story →
            </a> */}
          </div>
          
          {/* === RIGHT: Mission Points / Values === */}
          <div className={styles.pointsColumn}>
            {missionPoints.map((point, index) => {
                const IconComponent = point.icon;
                return (
                    <div 
                        key={index} 
                        className={styles.pointCard}
                        data-aos="fade-left"
                        data-aos-delay={10 + (index * 50)} // Staggered entry
                    >
                        <div className={styles.iconCircle}>
                            <IconComponent size={24} className={styles.pointIcon} />
                        </div>
                        <h3 className={styles.pointTitle}>{point.title}</h3>
                        <p className={styles.pointDescription}>{point.description}</p>
                    </div>
                );
            })}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutSection;