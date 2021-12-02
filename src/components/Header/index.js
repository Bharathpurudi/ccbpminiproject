import {Component} from 'react'
import {Link} from 'react-router-dom'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'
import './index.css'

class Header extends Component {
  state = {headerOpen: false}

  clickToOpenMenu = () => {
    this.setState({headerOpen: true})
  }

  clickToCloseMenu = () => {
    this.setState({headerOpen: false})
  }

  render() {
    const {headerOpen} = this.state
    return (
      <>
        <nav className="header-container">
          <Link to="/">
            <h1 className="covid-text">COVID19INDIA</h1>
          </Link>
          <ul className="header-items-list">
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
        <nav className="mobile-nav-container">
          <div className="mobile-header-container">
            <Link to="/">
              <h1 className="mobile-covid-text">COVID19INDIA</h1>
            </Link>
            <button
              type="button"
              className="mobile-button"
              onClick={this.clickToOpenMenu}
            >
              <GiHamburgerMenu className="mobile-header-icon" />
            </button>
          </div>
        </nav>
        {headerOpen && (
          <div className="mobile-redirecting-container">
            <ul className="mobile-home-about-container">
              <Link to="/" className="link-item">
                <li key="Home">
                  <p className="mobile-nav-item">Home</p>
                </li>
              </Link>
              <Link to="/about" className="link-item">
                <li key="about">
                  <p className="mobile-nav-item">About</p>
                </li>
              </Link>
            </ul>
            <button
              type="button"
              className="mobile-button"
              onClick={this.clickToCloseMenu}
            >
              <AiFillCloseCircle className="mobile-header-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default Header
