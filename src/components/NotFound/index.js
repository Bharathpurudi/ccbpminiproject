import Header from '../Header'
import './index.css'

const NotFound = props => {
  const onClickToGoHome = () => {
    const {history} = props
    history.replace('/')
  }

  return (
    <div className="not-found-container">
      <Header />
      <div className="failure-container">
        <img
          src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637986931/Group_7484_a35iey.png"
          alt="not-found-pic"
          className="failure-image"
        />
        <h1 className="failure-heading">PAGE NOT FOUND</h1>
        <p className="failure-text">
          we are sorry, the page you requested could not be found
        </p>
        <button
          className="home-redirect-button"
          type="button"
          onClick={onClickToGoHome}
        >
          Home
        </button>
      </div>
    </div>
  )
}

export default NotFound
