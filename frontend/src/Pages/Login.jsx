import React from 'react';
import styles from '../components/Contact/ContactSection.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import Navbar from '../components/Navbar/Navbar';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
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


        await axios({
            method: "post",
            url: apiurl + "login",
            data: formData
        }).then((response) => {
            console.log(response.data)
             const user = response.data.userDetails
            localStorage.setItem("token",response.data.token);
            localStorage.setItem("name",user.name);
            localStorage.setItem("email",user.email);
            localStorage.setItem("number",user.number);

           navigate("/admin")

            setFormData({
                email: '',
                password: ''
            });
            console.log(response);
        }).catch((error) => {
            console.log(error);
            alert("There was an error sending your message. Please try again later.");
        })
    }
    return (
        <>
        <Navbar/>
        <section className={styles.contactSection} id='contact'>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.sectionTitle}>Login Here</h2>
               
                </div>

                <div className={styles.contactLayout}>

                    {/* === LEFT: Contact Form === */}
                    <div className={styles.formContainer}>
                        <h3 className={styles.formHeader}>Login</h3>
                        <form className={styles.contactForm}>
                           

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
                                <label className={styles.label}>Password</label>
                                <input
                                    name="password"
                                    rows="4"
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
        </>
    );
};

export default Login;