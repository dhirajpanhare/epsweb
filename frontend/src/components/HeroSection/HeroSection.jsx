import React from 'react';
import styles from './HeroSection.module.css';

const metricsData = [
  { value: '20+', label: 'Years in Technology Leadership' },
  { value: '100+', label: 'Successful Projects Completed' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: 'Global', label: 'Client across 5 Countries' },
];

const HeroSection = ({ openModal }) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        <p
          className={styles.featureTag}
          data-aos="fade-down"
          data-aos-delay="100"
        >
          + Your Strategic Partner in Digital Transformation
        </p>

        <div className={styles.content}>
          <h1
            className={styles.headline}
            data-aos="fade-right"
            data-aos-delay="300"
          >
            Future-Proofing Your Business <br />
            with IT Solutions and Speed
          </h1>

          <p
            className={styles.subheadline}
            data-aos="fade-right"
            data-aos-delay="300"
          >
            We build custom software solutions and provide expert IT consulting, delivering faster with AI-driven development.
          </p>

          <div
            className={styles.ctaGroup}
            data-aos="fade-right"
            data-aos-delay="300"
          >
            <button 
              className={styles.primaryCta}
              onClick={openModal}   // <-- OPEN MODAL
            >
              Start Building Your AI Agent
            </button>

            <a href="#services">
              <button className={styles.secondaryCta}>
                Explore Our Services
              </button>
            </a>
          </div>
        </div>

        <div
          className={styles.metricsBar}
          data-aos="fade-left"
          data-aos-delay="900"
        >
          {metricsData.map((metric, index) => (
            <div
              key={index}
              className={styles.metricItem}
              data-aos="fade-up"
              data-aos-delay={100 + (index * 150)}
            >
              <p className={styles.metricValue}>{metric.value}</p>
              <p className={styles.metricLabel}>{metric.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
