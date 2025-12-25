import React from 'react';
import styles from '../components/Contact/ContactSection.module.css';
import { Mail, MapPin, Phone } from 'lucide-react';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
    

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        number: '',
        password: ''
    });

    // handle input change 
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    // handle form submission

    const apiurl = "http://localhost:3002/users/";

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation for required fields  
        if (formData.name === '' || formData.email === '' || formData.message === '') {
            alert("Please fill all required fields.");
            return;
        }
        await axios({
            method: "post",
            url: apiurl + "save",
            data: formData
        }).then((response) => {
            toast.success("✅ New Admin Added")
            setFormData({
                name: '',
                email: '',
                number: '',
                password: ''
            });
            console.log(response);
        }).catch((error) => {
            console.log(error);
            toast.error("✖️ Something Went Wrong!")

        })
    }
    return (
        <>
            <Navbar />
            <section className={styles.contactSection} id='contact'>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <h2 className={styles.sectionTitle}>Register Here   </h2>

                    </div>

                    <div className={styles.contactLayout}>

                        {/* === LEFT: Contact Form === */}
                        <div className={styles.formContainer}>
                            <h3 className={styles.formHeader}>Register</h3>
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
                                    <label className={styles.label}>Email</label>
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
                                    <label className={styles.label}>Number</label>
                                    <input
                                        type="text"
                                        name="number"
                                        value={formData.number}
                                        onChange={handleChange}
                                        placeholder="Your Number"
                                        className={styles.input}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>Password</label>
                                    <input
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Your Password ..."
                                        className={styles.textarea}
                                        required
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className={styles.submitButton}
                                    onClick={handleSubmit}
                                >
                                    Add Admin
                                </button>
                            </form>

                        </div>

                    </div>
                </div>
            </section>
            <ToastContainer autoClose={3000} hideProgressBar={false} />
        </>
    );
};

export default Register;