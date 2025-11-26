import {React , useEffect} from 'react'
import Navbar from './components/Navbar/Navbar'
import HeroSection from './components/HeroSection/HeroSection'
import ServicesSection from './components/Services/ServicesSection'
import AOS from 'aos'
import 'aos/dist/aos.css';
import AboutSection from './components/About/AboutSection'
import AIAgentSection from './components/AiAgent/AiAgentSection'
import ContactSection from './components/Contact/ContactSection'
import { Contact } from 'lucide-react'
import Footer from './components/Footer/FooterSection'

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,      // animation duration
      once: false,        // allow animation every time you scroll up/down
      mirror: true,       // animate elements when scrolling past them again
    });
  }, []);
  return (
    <div>
      <Navbar/>
      <HeroSection/>
      <ServicesSection/>
      <AIAgentSection/>
      <AboutSection/>  
      <ContactSection/> 
      <Footer/>
    </div>
  )
}

export default App
