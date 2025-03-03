import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './GoToTop.css';
 

const GoToTopButton = () => {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Show the button after navigation and when the page scrolls
    const handleScroll = () => {
      setVisible(window.scrollY > 300); // Button visible after scrolling 300px down
    };

    // Listen for scroll events
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    // Ensure the button is hidden on route change (optional)
    setVisible(false);
  }, [location]);

return (
    visible && (
        <button 
            type="button" 
            className="btn btn-primary" 
            id="gotoTop" 
            onClick={scrollToTop}
            style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 1000 }}
        >
            <i className="fas fa-chevron-up"></i> Go to top
        </button>
    )
);
};

export default GoToTopButton;
