import React from 'react';
import styles from './ContactSection.module.css';
import { Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// NOTE: Replace the mapEmbedUrl placeholder with the actual Google Maps Embed URL
const GoogleMapEmbed = () => {
    // This URL is a placeholder. Follow the steps provided previously to get the live embed URL.
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3679.6231011195656!2d75.8856285!3d22.7533604!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fd22a578351f%3A0x709087c53e02d711!2s17A%2C%20Electronic%20Complex%2C%20Pardeshipura%2C%20Indore%2C%20Madhya%20Pradesh%20452010!5e0!3m2!1sen!2sin!4v1700680000000!5m2!1sen!2sin"; 

    return (
        <div className={styles.googleMapEmbedContainer}>
            <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Emprosys Office Location"
            ></iframe>
            <div className={styles.mapPinOverlay}>
                <MapPin size={20} className={styles.mapPinIcon} />
                <span className={styles.mapPinText}>Emprosys Office</span>
            </div>
        </div>
    )
}

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  // handle input change 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  // handle form submission

  const apiurl = "http://localhost:3002/contact/";

  const handleSubmit = async (e) => {
    e.preventDefault(); 

  // Basic validation for required fields  
  if(formData.name === '' || formData.email === '' || formData.message === ''){
       toast.warning("⚠️ Please fill all required fields.", {
        position: "top-center",
      });
    return;
  }
    await axios({
      method: "post",
      url: apiurl + "save",
      data: formData
    }).then((response)=>{
      toast.success("✅ Message sent successfully!", {
        position: "top-center",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      console.log(response);
    }).catch((error)=>{
     console.log(error);
      toast.error("❌ Message failed to send. Please try again.", {
        position: "top-center",
      });
    })
  }
  return (
    <>
    <section className={styles.contactSection} id='contact'>
      <div className={styles.container}>
        <div className={styles.header}>
            <h2 className={styles.sectionTitle}>Let's Build the Future Together</h2>
            <p className={styles.sectionSubtitle}>
                Ready to discuss your digital transformation? Fill out the form or find us on the map.
            </p>
        </div>

        <div className={styles.contactLayout}>
          
          {/* === LEFT: Contact Form === */}
          <div className={styles.formContainer}>
            <h3 className={styles.formHeader}>Send Us a Message</h3>
           <form className={styles.contactForm}>
  <div className={styles.inputGroup}>
    <label className={styles.label}>Full Name</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      placeholder="Your Name"
      className={styles.input}
      required
    />
  </div>

  <div className={styles.inputGroup}>
    <label className={styles.label}>Work Email</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      placeholder="Your Email"
      className={styles.input}
      required
    />
  </div>

  <div className={styles.inputGroup}>
    <label className={styles.label}>Subject</label>
    <input
      type="text"
      name="subject"
      value={formData.subject}
      onChange={handleChange}
      placeholder="Your Subject"
      className={styles.input}
    />
  </div>

  <div className={styles.inputGroup}>
    <label className={styles.label}>Your Message</label>
    <textarea
      name="message"
      rows="4"
      value={formData.message}
      onChange={handleChange}
      placeholder="Your Message ..."
      className={styles.textarea}
      required
    ></textarea>
  </div>

  <button
    type="submit"
    className={styles.submitButton}
    onClick={handleSubmit}
  >
    Send Inquiry
  </button>
</form>
          </div>
          
          {/* === RIGHT: Map and Details === */}
          <div className={styles.mapContainer}>
            
            <GoogleMapEmbed /> 
{/* 
            <div className={styles.contactDetails}>
                <h3 className={styles.detailsHeader}>Office Location</h3>
                
                <div className={styles.detailItem}>
                    <MapPin size={20} className={styles.detailIcon} />
                    <p>17A Electronic Complex, Pardeshipura, Indore, MP 452010</p>
                </div>
                
                <div className={styles.detailItem}>
                    <Mail size={20} className={styles.detailIcon} />
                    <p>enprosys@epsinfotech.com</p>
                </div>
                
                <div className={styles.detailItem}>
                    <Phone size={20} className={styles.detailIcon} />
                    <p>+91 9009733733</p>
                </div>
            </div> */}
          </div>
          
        </div>
      </div>
    </section>
     {/* ✅ Toast container */}
      <ToastContainer autoClose={3000} hideProgressBar={false} />
      </>
  );
};

export default ContactSection;