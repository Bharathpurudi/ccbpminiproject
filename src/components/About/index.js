import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const fetchConstants = {
  initial: 'Initial',
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

class About extends Component {
  state = {faqDetails: [], fetchStatus: fetchConstants.initial}

  componentDidMount() {
    this.getFaqDetails()
  }

  getFaqDetails = async () => {
    this.setState({fetchStatus: fetchConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-faqs'
    const response = await fetch(apiUrl)

    if (response.ok) {
      const faqData = await response.json()
      const faqs = faqData.faq
      this.setState({faqDetails: faqs})
      this.setState({fetchStatus: fetchConstants.success})
    } else {
      this.setState({fetchStatus: fetchConstants.failure})
    }
  }

  renderOnAboutSuccess = () => {
    const {faqDetails} = this.state
    return (
      <div className="about-faqs-container">
        <h1 className="about-heading">About</h1>
        <p className="last-updated-text">Last update on 28 march 2021</p>
        <p className="vaccination-details">
          COVID-19 Vaccines be ready for distribution
        </p>
        <ul className="faqs-unordered-list" testid="faqsUnorderedList">
          {faqDetails.map(each => (
            <li className="faq-list-item" key={each.qno}>
              <p className="faq-question">{each.question}</p>
              <p className="faq-answer">{each.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderOnAboutLoading = () => (
    <div className="loader-container" testid="aboutRouteLoader">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  onClickToRedirectToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderOnAboutFailure = () => (
    <div className="failure-container">
      <img
        src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637986931/Group_7484_a35iey.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-heading">PAGE NOT FOUND</h1>
      <p className="failure-text">
        we’re sorry, the page you requested could not be found Please go back to
        the homepage
      </p>
      <button
        className="home-redirect-button"
        type="button"
        onClick={this.onClickToRedirectToHome}
      >
        Home
      </button>
    </div>
  )

  finalRenderOfAbout = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchConstants.success:
        return this.renderOnAboutSuccess()
      case fetchConstants.loading:
        return this.renderOnAboutLoading()
      case fetchConstants.failure:
        return this.renderOnAboutFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="about-bg-container">
        <Header />
        {this.finalRenderOfAbout()}
        <Footer />
      </div>
    )
  }
}

export default About
