import React from 'react';
import Navbar from './Navbar';
import '../Assets/AboutUs.css';
import aboutus from '../Assets/aboutus1.avif';
import aboutus2 from '../Assets/aboutus2.webp';
import Footer from './Footer';

const AboutUsPage = () => {
  return (
    <div className='about-us-page-body'>
      <Navbar />
      <div className="about-us-container">
        <div className="about-us-section">
          <div className="about-us-left">
            <h1>About Us</h1>
            <hr />
            <p>
              The most common problem – finding a home in the big city. Young people faced different kinds of discrimination.
              Single women and bachelors are considered unreliable. Migrants from other places are viewed with suspicion as they appear as ‘foreigners’ in a new city.
              Further, many newcomers did not have the knowhow to get around, lacking access to local insights in a new city.
              We concluded that people leaving homes to relocate to another city needed more than just a house. They needed a place they could call home, a community where they would be accepted and a platform which allows connections to various other access points.
            </p>
            <p>
              We soon realized that it was necessary to go beyond basics and create a platform that could do much more than just solve the immediate problems of space and peripherals.
              With globalization and communication taking a forefront, we are aware that society is becoming more disparate. Our response to this is - No city should be a stranger; no person should feel discriminated.
            </p>
          </div>
          <div className="about-us-right">
            <img src={aboutus} alt="About Us" />
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="mission-section">
          <div className="about-us-left">
            <img src={aboutus2} alt="Mission Statement" />
          </div>
          <div className="about-us-right">
            <h1>Mission Statement</h1>
            <hr />
            <p>
              Our mission is to provide exceptional rental homes that offer comfort, quality, and a sense of community.
              We are dedicated to creating inviting spaces where our tenants can thrive and feel truly at home. Through personalized service, attention to detail, and a commitment to excellence, we strive to enhance the rental experience and build lasting relationships with our residents.
              Our goal is to deliver a seamless, enjoyable living experience that meets the diverse needs and aspirations of our tenants.
            </p>
            <p>
              We want to address the issues of young migrants who are discriminated against for various reasons.
              We want to bridge the gap between youth and the older generation, finding common ground and making the relationships mutually beneficial.
              We want to make housing affordable and cater to individual needs, which greatly vary depending on personality.
              We wanted to remove the middle-man the broker, who often becomes a decider of where you will stay rather than cater to your taste.
            </p>
          </div>
          <div className="clearfix"></div>
        </div>
        <div className="team-section">
          <h1>Administrators<hr /></h1>
          <div className="team-card">
            <div className="team-circle-container">
              <h1 style={{ color: '#fff' }}>M</h1>
            </div>
            <h2>Mahudesh M</h2>
            <h4>Btech - Information Technology</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="team-card">
            <div className="team-circle-container">
              <h1 style={{ color: '#fff' }}>M</h1>
            </div>
            <h2>Manikandan C</h2>
            <h4>Btech - Information Technology</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="team-card">
            <div className="team-circle-container">
              <h1 style={{ color: '#fff' }}>M</h1>
            </div>
            <h2>Mathimalar K</h2>
            <h4>Btech - Information Technology</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          <div className="team-card">
            <div className="team-circle-container">
              <h1 style={{ color: '#fff' }}>M</h1>
            </div>
            <h2>Manivel N</h2>
            <h4>Btech - Information Technology</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
        </div>
      </div>
      <Footer className="about-us-footer"/>
    </div>
  );
};

export default AboutUsPage;
