import React from 'react';
import styles from './HowWeWork.module.css';
import { Users, Bot, Zap, CheckCircle, Calendar, MessageCircle } from 'lucide-react';

const workflowSteps = [
  {
    id: 1,
    title: 'Discovery & Planning',
    description: 'We start by understanding your business goals and technical requirements through collaborative sessions.',
    icon: MessageCircle,
    color: '#8CA9FF',
    highlight: 'Human-Led'
  },
  {
    id: 2,
    title: 'AI-Accelerated Development',
    description: 'Our developers work alongside AI tools to build your solution 3x faster without compromising quality.',
    icon: Zap,
    color: '#8CA9FF',
    highlight: 'Human + AI'
  },
  {
    id: 3,
    title: 'Regular Check-ins',
    description: 'Weekly progress reviews ensure you stay informed and aligned with every milestone we achieve.',
    icon: Calendar,
    color: '#8CA9FF',
    highlight: 'Transparent'
  },
  {
    id: 4,
    title: 'Quality Assurance',
    description: 'Human expertise validates AI-assisted code through rigorous testing and review processes.',
    icon: CheckCircle,
    color: '#8CA9FF',
    highlight: 'Human-Verified'
  }
];

const HowWeWork = () => {
  return (
    <section className={styles.workSection} id="how-we-work">
      <div className={styles.container}>
        
        <h2 className={styles.sectionTitle} data-aos="fade-up">
          How We Work
        </h2>
        <p className={styles.sectionSubtitle} data-aos="fade-up" data-aos-delay="100">
          Combining human expertise with AI power to deliver exceptional results, faster.
        </p>

        {/* Hero Statement */}
        <div className={styles.heroStatement} data-aos="fade-up" data-aos-delay="200">
          <div className={styles.iconGroup}>
            <div className={styles.iconBadge}>
              <Users size={32} />
            </div>
            <span className={styles.plusSign}>+</span>
            <div className={styles.iconBadge}>
              <Bot size={32} />
            </div>
          </div>
          <h3 className={styles.heroTitle}>Human Expertise + AI Speed</h3>
          <p className={styles.heroDescription}>
            We leverage cutting-edge AI tools to accelerate development while maintaining 
            the creativity, judgment, and quality that only human experts can provide.
          </p>
        </div>

        {/* Workflow Steps */}
        <div className={styles.workflowGrid}>
          {workflowSteps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div 
                key={step.id}
                className={styles.workflowCard}
                data-aos="fade-up"
                data-aos-delay={100 * (index + 1)}
              >
                <div className={styles.cardHeader}>
                  <div 
                    className={styles.iconCircle}
                    style={{ backgroundColor: step.color }}
                  >
                    <IconComponent size={28} style={{ color: '#fff' }} />
                  </div>
                  <span className={styles.stepNumber}>Step {step.id}</span>
                </div>
                
                <div className={styles.cardContent}>
                  <div className={styles.titleRow}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <span className={styles.highlightBadge}>{step.highlight}</span>
                  </div>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Benefits Section */}
        <div className={styles.benefitsSection} data-aos="fade-up" data-aos-delay="500">
          <h3 className={styles.benefitsTitle}>Why This Approach Works</h3>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>⚡</div>
              <h4>3x Faster Delivery</h4>
              <p>AI accelerates coding, testing, and deployment without sacrificing quality</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>💰</div>
              <h4>Cost Effective</h4>
              <p>Reduced development time means lower costs and faster ROI</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>🎯</div>
              <h4>Always Aligned</h4>
              <p>Regular check-ins keep your project on track and on budget</p>
            </div>
            <div className={styles.benefitCard}>
              <div className={styles.benefitIcon}>✨</div>
              <h4>Human Touch</h4>
              <p>Expert oversight ensures creativity and strategic thinking</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowWeWork;
