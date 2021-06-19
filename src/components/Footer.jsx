import logof from '../img/logof.svg';

const Footer = () => {
  return (
    <div className="footer">
      <div className="links">LINKS</div>
      <div className="footer-logo">
        <img src={logof} alt="logo del footer" />
      </div>
      <div className="social-links">LINKS SOCIAL</div>
    </div>
  );
};

export default Footer;
