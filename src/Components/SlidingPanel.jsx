import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight, FaCheck } from 'react-icons/fa'; // Import icons
import '../Assets/SlidingPanel.css';

const SlidingPanel = () => {
    const [isOpen, setIsOpen] = useState(true); // Initially open

    const togglePanel = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        setIsOpen(true); // Ensure the panel is open initially
    }, []);

    return (
        <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
            <div className="panel-content">
                <h2>Things you Can Do with Habitat Hunt Account</h2>
                <ul>
                    <li><FaCheck /> Post one Single Property for FREE</li>
                    <li><FaCheck /> Set property alerts for your requirement</li>
                    <li><FaCheck /> Get accessed by over 1 Lakh buyers</li>
                    <li><FaCheck /> Showcase your property as Rental, PG or for Sale</li>
                    <li><FaCheck /> Get instant queries over Phone, Email and SMS</li>
                    <li><FaCheck /> Performance in search & Track responses & views online</li>
                    <li><FaCheck /> Add detailed property information & multiple photos per listing</li>
                    <li><FaCheck /> View detailed analytics of property performance</li>
                    <li><FaCheck /> Get personalized suggestions for better property management</li>
                    <li><FaCheck /> Utilize advanced search filters for property hunting</li>
                    <li><FaCheck /> Receive regular updates and newsletters</li>
                    <li><FaCheck /> Access customer support for any queries</li>
                    <li><FaCheck /> Participate in community forums and discussions</li>
                </ul>
               
                <p>For more details, visit our <a href="/features">Contact Page</a> or contact support.</p>
            </div>
            <div className="toggle-button" onClick={togglePanel}>
                {isOpen ? <FaArrowLeft /> : <FaArrowRight />}
            </div>
        </div>
    );
};

export default SlidingPanel;
