import React, { useState } from 'react';
import '../Assets/Payment.css';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Payment = () => {
    const [showModal, setShowModal] = useState(false);
    const [hovered, setHovered] = useState(null);
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [showPaymentForm, setShowPaymentForm] = useState(false);
    const [showConfirmationPopup, setShowConfirmationPopup] = useState(false);

    const [upiId, setUpiId] = useState('');
    const [upiMobileNumber, setUpiMobileNumber] = useState('');

    const handleModalOpen = () => {
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const handlePaymentMethodSelect = (index) => {
        setSelectedMethod(index);
        setShowConfirmationPopup(true);
    };

    const handleConfirmationCancel = () => {
        setShowConfirmationPopup(false);
    };

    const handleProceedToPayment = () => {
        setShowConfirmationPopup(false);
        setShowPaymentForm(true);
    };

    const handlePaymentFormClose = () => {
        setShowPaymentForm(false);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (methods[selectedMethod] === 'UPI') {
            if (!upiId && !upiMobileNumber) {
                alert('Please enter either UPI ID or UPI Mobile Number.');
                return;
            }
        }
        
        // Handle the form submission logic here
        alert('Form submitted successfully!');
    };

    const houseFindingFee = 5000;
    const sgst = 450;
    const cgst = 350;
    const total = houseFindingFee + sgst + cgst;
    const methods = [
        'CREDIT CARD',
        'DEBIT CARD',
        'UPI',
    ];

    return (
        <div className='charge-whole'>
            <Navbar/>
            
            <header className='new-header'>
                <h1>Pay Rental Fee</h1>
            </header>
            
            <div className="charges-container">
                <h2>Charges to pay now</h2>
                <div className="charges-item">
                    <div className="charges-description">
                        <h3>House Finding Fee</h3>
                        <div className='charges-paracharges'>
                            <p>
                                Habitat Hunt charges a accommodation convenience fee of Rs. {houseFindingFee}.
                                Additional Taxes Applicable: SGST of Rs. {sgst}, CGST of Rs. {cgst}
                            </p>
                        </div>
                    </div>
                    <div className="charges-amount">
                        ₹ {houseFindingFee.toLocaleString()}
                    </div>
                </div>
                <div className="charges-item">
                    <div className="charges-description">
                        <h3>SGST</h3>
                        <div className='charges-paracharges'>
                            <p>9.0% applicable on {houseFindingFee}/-</p>
                        </div>
                    </div>
                    <div className="charges-amount">
                        ₹ {sgst.toLocaleString()}
                    </div>
                </div>
                <div className="charges-item">
                    <div className="charges-description">
                        <h3>CGST</h3>
                        <div className='charges-paracharges'>
                            <p>7.0% applicable on {houseFindingFee}/-</p>
                        </div>
                    </div>
                    <div className="charges-amount">
                        ₹ {cgst.toLocaleString()}
                    </div>
                </div>
                <div className="charges-details-link">
                    <button onClick={handleModalOpen}>Charges Details</button>
                </div>

                {showModal && (
                    <div className="charges-modal-overlay">
                        <div className="charges-modal">
                            <h2>Charges Details</h2>
                            <ul>
                                <li>House Finding Fee: ₹ {houseFindingFee.toLocaleString()}</li>
                                <li>SGST: ₹ {sgst.toLocaleString()}</li>
                                <li>CGST: ₹ {cgst.toLocaleString()}</li>
                                <li><strong>Total: ₹ {total.toLocaleString()}</strong></li>
                            </ul>
                            <button onClick={handleModalClose}>Close</button>
                        </div>
                    </div>
                )}

                {/* Choose Payment Method Section */}
                <div className="charges-container-methods">
                    <h2>Choose a Method for Payment</h2>
                    {methods.map((method, index) => (
                        <div
                            key={index}
                            className={`charges-method-item ${hovered === index ? 'hovered' : ''}`}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => handlePaymentMethodSelect(index)}
                        >
                            {method}
                        </div>
                    ))}
                </div>

                {/* Confirmation Popup */}
                {showConfirmationPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h2>Confirm Payment</h2>
                            <p>You have selected <strong>{methods[selectedMethod]}</strong> as your payment method.</p>
                            <p>Would you like to proceed to the payment details?</p>
                            <div className="popup-buttons">
                                <button onClick={handleProceedToPayment}>Proceed</button>
                                <button onClick={handleConfirmationCancel}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Payment Form Modal */}
                {showPaymentForm && (
                    <div className="payment-modal-overlay">
                        <div className="payment-modal">
                            <h2>Enter {methods[selectedMethod]} Details</h2>
                            <form className="payment-form" onSubmit={handleSubmit}>
                                {methods[selectedMethod] === 'UPI' ? (
                                    <>
                                        <label>
                                            UPI ID
                                            <input 
                                                type="text" 
                                                value={upiId} 
                                                onChange={(e) => setUpiId(e.target.value)} 
                                                placeholder="Enter UPI ID" 
                                                required 
                                            />
                                        </label>
                                        <label>
                                            UPI Mobile Number
                                            <input 
                                                type="text" 
                                                value={upiMobileNumber} 
                                                onChange={(e) => setUpiMobileNumber(e.target.value)} 
                                                placeholder="Enter UPI Mobile Number" 
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <>
                                        <label>
                                            Card Number
                                            <input type="text" required />
                                        </label>
                                        <label>
                                            Expiry
                                            <input type="text" placeholder="MM/YY" required />
                                        </label>
                                        <label>
                                            CVV
                                            <input type="text" required />
                                        </label>
                                        <label>
                                            Name on Card
                                            <input type="text" required />
                                        </label>
                                    </>
                                )}
                                <button type="submit">Proceed</button>
                            </form>
                            <button className="close-button" onClick={handlePaymentFormClose}>Close</button>
                        </div>
                    </div>
                )}

                <div className="pay-now-container">
                    <button className="pay-now-button">Pay Now</button>
                </div>
            </div>
        </div>
    );
}

export default Payment;
