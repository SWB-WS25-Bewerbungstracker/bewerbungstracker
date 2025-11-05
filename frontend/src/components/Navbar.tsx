import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Bewerbungstracker</Link>
      </div>

      <ul className="navbar-tabs">
        <li className={location.pathname === "/termine" ? "active" : ""}>
          <Link to="/termine">Termine</Link>
        </li>
        <li className={location.pathname === "/bewerbungen" ? "active" : ""}>
          <Link to="/bewerbungen">Bewerbungen</Link>
        </li>
        <li className={location.pathname === "/dokumente" ? "active" : ""}>
          <Link to="/dokumente">Dokumente</Link>
        </li>
        <li className={location.pathname === "/einstellungen" ? "active" : ""}>
          <Link to="/einstellungen">Einstellungen</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

/* Figma HTML Export:
<div data-layer="Bewerbungstracker Textfeld" 
  className="BewerbungstrackerTextfeld" 
  style={{width: 1440, 
          paddingLeft: 48, 
          paddingRight: 48, 
          paddingTop: 32, 
          paddingBottom: 32, 
          borderBottom: '1px #B3B3B3 solid', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          display: 'inline-flex'}}>
  <div data-layer="Bewerbungstracker" 
    className="Bewerbungstracker" 
    style={{color: 'black', 
            fontSize: 36, 
            fontFamily: 'Inter', 
            fontWeight: '700', 
            wordWrap: 'break-word'}}>Bewerbungstracker </div>
  <div data-layer="Termine" 
    className="Termine" 
    style={{color: 'black', 
            fontSize: 24, 
            fontFamily: 'Inter', 
            fontWeight: '400', 
            wordWrap: 'break-word'}}>Termine</div>
  <div data-layer="Bewerbungen" 
    className="Bewerbungen" 
    style={{color: 'black', 
            fontSize: 24, 
            fontFamily: 'Inter', 
            fontWeight: '400', 
            wordWrap: 'break-word'}}>Bewerbungen</div>
  <div data-layer="Dokumente" 
    className="Dokumente" 
    style={{color: 'black', 
            fontSize: 24, 
            fontFamily: 'Inter', 
            fontWeight: '400', 
            wordWrap: 'break-word'}}>Dokumente</div>
</div>
*/