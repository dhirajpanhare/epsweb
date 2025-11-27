import React from 'react';
import styles from './ServicesSection.module.css';

import { 
  Monitor,
  Smartphone,
  DraftingCompass,
  Cloud,
  Lightbulb,
  LifeBuoy
} from 'lucide-react';

const servicesData = [
  { 
    title: 'Web Development', 
    icon: Monitor,
    color: 'var(--yellow)'
  },
  { 
    title: 'Mobile Applications', 
    icon: Smartphone,
    color: 'var(--yellow)'
  },
  { 
    title: 'UI/UX Design',
    icon: DraftingCompass,
    color: 'var(--yellow)'
  },
  { 
    title: 'Digital Solutions',
    icon: Cloud,
    color: 'var(--green)'
  },
  { 
    title: 'IT Consulting',
    icon: Lightbulb,
    color: 'var(--purple)'
  },
  { 
    title: 'Technical Support',
    icon: LifeBuoy,
    color: 'var(--teal)'
  },
];

const ServicesSection = () => {
  return (
    <section className={styles.servicesSection} data-os="fade-up" id='services'>
      <div className={styles.container}>
        
        <h2 className={styles.sectionTitle}>Our Core Expertise</h2>
        <p className={styles.sectionSubtitle}>
          Innovative IT solutions tailored for your digital future.
        </p>
        
        <div className={styles.servicesGrid}>
          {servicesData.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div 
                key={index}
                className={styles.serviceCard}
                data-color={service.color}
                data-aos="fade-down"
              >
                
                {/* ICON CIRCLE UPDATED BELOW */}
                <div
                  className={styles.iconCircle}
                  style={{ backgroundColor: "#8CA9FF" }}
                >
                  <IconComponent size={24} style={{ color: "#fff" }} />
                </div>

                <div className={styles.cardContent}>
                  <h3 className={styles.serviceTitle}>{service.title}</h3>

                  {/* <p className={styles.shortDescription}>{service.shortDesc}</p> */}

                  <div className={styles.expandedContent}>
                    {/* <p>{service.fullDesc}</p> */}
                    {/* <a href="#" className={styles.actionLink}>Learn More →</a> */}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
