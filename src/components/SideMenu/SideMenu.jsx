import React, { useState } from 'react';
import './SideMenu.css';
import mainLogo from '../../assets/mainLogo.png';

const SideMenu = ({ sections, activeSection, onSectionChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button 
        className={`hamburger-button ${isOpen ? 'open' : ''}`}
        onClick={toggleMenu}
        aria-label="Abrir menú"
        style={{ zIndex: 3000 }}
      >
        <span className="burger-line"></span>
        <span className="burger-line"></span>
        <span className="burger-line"></span>
      </button>

      {isOpen && <div className="menu-overlay" onClick={toggleMenu} />}

      <div className={`side-menu ${isOpen ? 'open' : ''}`} style={{ zIndex: 2500 }}>
        <div className="menu-header">
          <img src={mainLogo} alt="Logo hagamosnumeros.com" className="side-logo" />
        </div>
        <nav className="menu-content">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`menu-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => {
                onSectionChange(section.id);
                setIsOpen(false);
              }}
            >
              {section.icon && <span className="menu-icon">{section.icon}</span>}
              {section.name}
            </button>
          ))}
        </nav>
      </div>
    </>
  );
};

export default SideMenu; 