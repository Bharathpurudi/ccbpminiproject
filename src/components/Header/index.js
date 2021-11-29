import {Link} from 'react-router-dom'
import './index.css'

const Header = () => (
  <nav className="header-container">
    <ul className="header-items-list">
      <Link to="/" className="link-item">
        <li key="Header">
          <h1 className="covid-text">
            COVID19<span className="india-text">INDIA</span>
          </h1>
        </li>
      </Link>
      <div className="home-about-container">
        <Link to="/" className="link-item">
          <li key="Home">
            <p className="nav-item">Home</p>
          </li>
        </Link>
        <Link to="/about" className="link-item">
          <li key="about">
            <p className="nav-item">About</p>
          </li>
        </Link>
      </div>
    </ul>
  </nav>
)

export default Header
