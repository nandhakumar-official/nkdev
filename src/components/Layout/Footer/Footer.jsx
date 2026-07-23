// src/components/Layout/Footer.jsx
import "./Footer.css";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-copy">
          © {new Date().getFullYear()} Nandha Kumar C
        </div>
      </div>
    </footer>
  );
};

export default Footer;
