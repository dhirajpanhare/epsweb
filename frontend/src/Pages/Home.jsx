import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import HeroSection from '../components/HeroSection/HeroSection'
import ServicesSection from '../components/Services/ServicesSection'
import HowWeWork from '../components/HowWeWork/HowWeWork'
import AIAgentSection from '../components/AiAgent/AiAgentSection'
import DataAnalytics from '../components/DataAnalytics/DataAnalytics'
import AboutSection from '../components/About/AboutSection'
import ContactSection from '../components/Contact/ContactSection'
import Footer from '../components/Footer/FooterSection'
import ProposalModal from '../components/HeroSection/ProposalModal'
import { useState } from 'react'
const Home = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Navbar/>
      <HeroSection  openModal={() => setIsModalOpen(true)}/>
        <ProposalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <ServicesSection/>
      <HowWeWork/>
      <AIAgentSection/>
      <DataAnalytics/>
      <AboutSection/>
      <ContactSection/>
      <Footer/>
    </div>
  )
}

export default Home
