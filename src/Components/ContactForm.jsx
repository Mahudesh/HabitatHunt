import React, { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaMeta } from "react-icons/fa6";
import { BsTwitterX } from "react-icons/bs";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdMail } from "react-icons/io";
import styles from '../Assets/ContactForm.module.css';
import Navbar from './Navbar';

const ContactUs = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        const inputs = document.querySelectorAll(`.${styles.input}`);


        const focusFunc = (event) => {
            let parent = event.target.parentNode;
            parent.classList.add(styles.inputContainerFocus);
        };

        const blurFunc = (event) => {
            let parent = event.target.parentNode;
            if (event.target.value === "") {
                parent.classList.remove(styles.inputContainerFocus);
            }
        };

        inputs.forEach((input) => {
            input.addEventListener("focus", focusFunc);
            input.addEventListener("blur", blurFunc);
        });

        return () => {
            inputs.forEach((input) => {
                input.removeEventListener("focus", focusFunc);
                input.removeEventListener("blur", blurFunc);
            });
        };
    }, []);

    return (
        <div className={styles.container}>
            <Navbar/>
            <span className={styles.bigCircle}></span>
            <img src="img/shape.png" className={styles.square} alt="" />
            <div className={styles.form}>
                <div className={styles.contactInfo}>
                    <h3 className={styles.title}>Let's get in touch</h3>
                    {/* <p className={styles.text}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
                        dolorum adipisci recusandae praesentium dicta!
                    </p> */}

                    <div className={styles.info}>
                        <div className={styles.information}>
                            <IoLocationSharp className={styles.icon} />
                            <p>Sri Krishna College Of Technology, Kovaipudur, Coimbatore - 641042</p>
                        </div>
                        <div className={styles.information}>
                            <IoMdMail className={styles.icon} />
                            <p>727822tuit129@skct.edu.in</p>
                        </div>
                        <div className={styles.information}>
                            <IoMdMail className={styles.icon} />
                            <p>727822tuit130@skct.edu.in</p>
                        </div>
                        <div className={styles.information}>
                            <IoMdMail className={styles.icon} />
                            <p>727822tuit132@skct.edu.in</p>
                        </div>
                    </div>

                    <div className={styles.socialMedia}>
                        <p className={styles.socialMediaText}>Connect with us :</p>
                        <div className={styles.socialIcons}>
                            <FcGoogle className={styles.socialicon} />
                            <FaMeta className={styles.socialicon} />
                            <BsTwitterX className={styles.socialicon} />
                        </div>
                    </div>
                </div>

                <div className={styles.contactForm}>
                <span className={`${styles.circle} ${styles.circleOne}`}></span>
<span className={`${styles.circle} ${styles.circleTwo}`}></span>


                    <form className={styles.contactusform} action="index.html" autoComplete="off">
                        <h3 className={styles.title}>Contact us</h3>
                        <div className={styles.inputContainer}>
                            <input type="text" name="name" required className={styles.input} value={name} onChange={(e) => setName(e.target.value)} />
                            <label className={styles.label}>Username</label>
                            <span className={styles.span}>Username</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="email" name="email" required className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className={styles.label}>Email</label>
                            <span className={styles.span}>Email</span>
                        </div>
                        <div className={styles.inputContainer}>
                            <input type="tel" name="phone" className={styles.input} />
                            <label className={styles.label}>Phone</label>
                            <span className={styles.span}>Phone</span>
                        </div>
                        <div className={`${styles.inputContainer} ${styles.textarea}`}>

                            <textarea name="message" className={styles.input} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
                            <label className={styles.textareaLabel}>Message</label>
                            <span className={styles.span}>Message</span>
                        </div>
                        <input type="submit" value="Send" className={styles.btn} />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;