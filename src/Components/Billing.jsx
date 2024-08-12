import React, { useState } from 'react';
import Cards from 'react-credit-cards-2';
import PhoneInput from 'react-phone-input-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCcVisa, faCcMastercard, faCcAmex, faCcPaypal } from '@fortawesome/free-brands-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import '../Assets/Billing.css';

const Payment = () => {
  const [cardData, setCardData] = useState({
    cvc: '',
    name: '',
    number: '',
    expiryMonth: '',
    expiryYear: ''
  });
  const [focused, setFocused] = useState('');
  const [phone, setPhone] = useState('');
  const [upi, setUpi] = useState('');
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleFocusChange = (e) => {
    setFocused(e.target.name);
  };

  const validateForm = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Basic validation for all fields
    if (!cardData.name) newErrors.name = 'Name on card is required';
    if (!cardData.number) newErrors.number = 'Card number is required';
    if (!cardData.expiryMonth) newErrors.expiryMonth = 'Expiry month is required';
    if (!cardData.expiryYear) newErrors.expiryYear = 'Expiry year is required';
    if (!cardData.cvc) newErrors.cvc = 'CVC is required';
    if (!phone) newErrors.phone = 'Phone number is required';
    if (!upi) newErrors.upi = 'UPI ID is required';

    // Card number validation (basic validation for demo purposes)
    const cardNumberPattern = /^\d{4}-\d{4}-\d{4}-\d{4}$/;
    if (cardData.number && !cardNumberPattern.test(cardData.number)) {
      newErrors.number = 'Card number format is invalid';
    }

    // Expiry date validation (basic format check)
    const expiryMonthPattern = /^(0[1-9]|1[0-2])$/;
    const expiryYearPattern = /^\d{2}$/;
    if (cardData.expiryMonth && !expiryMonthPattern.test(cardData.expiryMonth)) {
      newErrors.expiryMonth = 'Expiry month format should be MM';
    }
    if (cardData.expiryYear && !expiryYearPattern.test(cardData.expiryYear)) {
      newErrors.expiryYear = 'Expiry year format should be YY';
    }

    // CVV validation
    if (cardData.cvc && (cardData.cvc.length < 3 || cardData.cvc.length > 4)) {
      newErrors.cvc = 'CVV should be 3 or 4 digits';
    }

    // UPI ID validation (basic check for '@' symbol)
    if (upi && !upi.startsWith('@')) {
      newErrors.upi = 'UPI ID must start with "@"';
    }

    setErrors(newErrors);
  };

  return (
    <div className='whole'>
    <div 
    className="container"
    style={{
        background: `linear-gradient(
          rgba(0, 0, 0, 0.4), 
          rgba(0, 0, 0, 0.4)
        ), url()`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
      >
      <form onSubmit={validateForm}>
        <div className="row">
          <div className="col">
            <h3 className="title">Billing Address</h3>
            <div className="inputBox">
              <span>Full Name :</span>
              <input type="text" placeholder="Rakesh" name="name" value={cardData.name} onChange={handleInputChange} onFocus={handleFocusChange} required />
              {errors.name && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.name}</div>}
            </div>
            <div className="inputBox">
              <span>Email :</span>
              <input type="email" placeholder="example@example.com" required />
            </div>
            <div className="inputBox">
              <span>Address :</span>
              <input type="text" placeholder="house number - Street - Locality" required />
            </div>
            <div className="inputBox">
              <span>City :</span>
              <input type="text" placeholder="Coimbatore" required />
            </div>
            <div className="flex">
              <div className="inputBox">
                <span>State :</span>
                <input type="text" placeholder="Tamil Nadu" required />
              </div>
              <div className="inputBox">
                <span>Zip Code :</span>
                <input type="text" placeholder="123 456" required />
              </div>
            </div>
            <div className="inputBox">
              <span></span>
              <PhoneInput
                country={'in'}
                value={phone}
                onChange={setPhone}
                inputProps={{
                  name: 'phone',
                  required: true,
                }}
                inputStyle={{ width: '100%' }}
              />
              {errors.phone && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.phone}</div>}
            </div>
          </div>
          <div className="col">
            <h3 className="title">Payment</h3>
            <div className="inputBox">
              <span>Cards Accepted :</span>
              <div className="card-icons">
                <FontAwesomeIcon icon={faCcVisa} color="#1a1f71" />
                <FontAwesomeIcon icon={faCcMastercard} color="#eb001b" />
                <FontAwesomeIcon icon={faCcAmex} color="#007bc1" />
                <FontAwesomeIcon icon={faCcPaypal} color="#003087" />
              </div>
            </div>
            <div className="inputBox">
              <span>Name on Card :</span>
              <input
                type="text"
                placeholder="Rakesh"
                name="name"
                value={cardData.name}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.name && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.name}</div>}
            </div>
            <div className="inputBox">
              <span>Credit Card Number :</span>
              <input
                type="text"
                placeholder="1111-2222-3333-4444"
                name="number"
                value={cardData.number}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.number && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.number}</div>}
            </div>
            <div className="inputBox">
              <span>Exp Month :</span>
              <input
                type="text"
                placeholder="01"
                name="expiryMonth"
                value={cardData.expiryMonth}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.expiryMonth && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.expiryMonth}</div>}
            </div>
            <div className="inputBox">
              <span>Exp Year :</span>
              <input
                type="text"
                placeholder="23"
                name="expiryYear"
                value={cardData.expiryYear}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.expiryYear && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.expiryYear}</div>}
            </div>
            <div className="inputBox">
              <span>CVV :</span>
              <input
                type="text"
                placeholder="123"
                name="cvc"
                value={cardData.cvc}
                onChange={handleInputChange}
                onFocus={handleFocusChange}
                required
              />
              {errors.cvc && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.cvc}</div>}
            </div>
            <div className="inputBox">
              <span>UPI ID :</span>
              <input
                type="text"
                placeholder="@example"
                name="upi"
                value={upi}
                onChange={(e) => {
                  setUpi(e.target.value);
                  setErrors({ ...errors, upi: '' });
                }}
                required
              />
              {errors.upi && <div className="error"><FontAwesomeIcon icon={faInfoCircle} /> {errors.upi}</div>}
            </div>
          </div>
        </div>
        <input type="submit" value="Place Order" className="submit-btn" />
      </form>
    </div>
    </div>
  );
};

export default Payment;
