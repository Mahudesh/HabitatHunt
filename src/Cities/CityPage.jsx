import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoimbatorePage from './CoimbatorePage';
import ChennaiPage from './ChennaiPage';
import KanyakumariPage from './KanyakumariPage'; 
import MaduraiPage from './MaduraiPage';
import PondicherryPage from './PondicherryPage';
import TanjorePage from './TanjorePage';

const CityPage = () => {
  const { cityId } = useParams();
  
  // Render city-specific content based on cityId
  switch (cityId) {
    case '1':
      return <CoimbatorePage />;
    case '2':
      return <ChennaiPage />;
    case '3':
      return <KanyakumariPage />;
    case '4':
      return <MaduraiPage />;
    case '5':
      return <PondicherryPage />;
    case '6':
      return <TanjorePage />;
    default:
      return <div>City not found</div>;
  }
};

export default CityPage;
