import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import {FcGenericSortingAsc, FcGenericSortingDesc} from 'react-icons/fc'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import FilteredState from '../FilteredState'
import Footer from '../Footer'

import './index.css'

const fetchConstants = {
  initial: 'Initial',
  loading: 'Loading',
  success: 'Success',
  failure: 'Failure',
}

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'TT',
    state_name: 'The Government of NCT of Delhi',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

class Home extends Component {
  state = {
    searchedState: '',
    statesSearchList: [],
    dataFetchStatus: fetchConstants.initial,
    convertedData: [],
  }

  componentDidMount() {
    this.getCovidInsights()
  }

  getCovidInsights = async () => {
    this.setState({dataFetchStatus: fetchConstants.loading})
    const apiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'

    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()
      const modifiedData = this.convertObjectDataToArray(data)
      this.setState({convertedData: modifiedData})
      this.setState({dataFetchStatus: fetchConstants.success})
    } else {
      this.setState({dataFetchStatus: fetchConstants.failure})
    }
  }

  convertObjectDataToArray = insightRawData => {
    const resultList = []
    const keyNames = Object.keys(insightRawData)
    keyNames.forEach(keyName => {
      if (insightRawData[keyName]) {
        const {total} = insightRawData[keyName]
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = insightRawData[keyName].meta.population
          ? insightRawData[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state.state_code === keyName)
            .state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList
  }

  onSearchOnState = event => {
    this.setState({searchedState: event.target.value}, this.renderFilteredList)
  }

  renderFilteredList = () => {
    const {searchedState} = this.state
    if (searchedState === '') {
      this.setState({statesSearchList: []})
    } else {
      const filteredList = statesList.filter(eachState =>
        eachState.state_name
          .toLowerCase()
          .includes(searchedState.toLowerCase()),
      )
      this.setState({statesSearchList: filteredList})
    }
  }

  renderOnLoading = () => (
    <div className="loader-container" testid="homeRouteLoader">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  renderOnSuccess = () => {
    const {convertedData} = this.state
    const confirmedCasesCount = convertedData
      .map(each => parseInt(each.confirmed))
      .reduce((prev, curr) => prev + curr, 0)
    const activeCasesCount = convertedData
      .map(each => parseInt(each.active))
      .reduce((prev, curr) => prev + curr, 0)
    const recoveredCasesCount = convertedData
      .map(each => parseInt(each.recovered))
      .reduce((prev, curr) => prev + curr, 0)
    const deceasedCasesCount = convertedData
      .map(each => parseInt(each.deceased))
      .reduce((prev, curr) => prev + curr, 0)

    const sortDataInDesc = () => {
      const descendingSortedList = []
        .concat(convertedData)
        .sort((a, b) => (a > b ? 1 : -1))
      this.setState(
        {convertedData: descendingSortedList},
        this.finalRenderStatesInsights,
      )
    }

    const sortDataInAsc = () => {
      const ascendingSortedList = []
        .concat(convertedData)
        .sort((a, b) => (a > b ? 1 : -1))
      this.setState(
        {convertedData: ascendingSortedList},
        this.finalRenderStatesInsights,
      )
    }

    return (
      <>
        <div className="nation-wide-cases-container">
          <div
            className="total-cases-container"
            testid="countryWideConfirmedCases"
          >
            <p className="confirmed-card-text">Confirmed</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637926976/check-mark_1_lhao9n.png"
              alt="country wide confirmed cases pic"
              className="confirmed-pic"
            />
            <p className="confirmed-cases-count">{confirmedCasesCount}</p>
          </div>
          <div
            className="total-cases-container"
            testid="countryWideActiveCases"
          >
            <p className="active-card-text">Active</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932347/protection_1_vxqdnb.png"
              alt="country wide active cases pic"
              className="confirmed-pic"
            />
            <p className="active-cases-count">{activeCasesCount}</p>
          </div>
          <div
            className="total-cases-container"
            testid="countryWideRecoveredCases"
          >
            <p className="recovered-card-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932539/recovered_1_sxtfix.png"
              alt="country wide recovered cases pic"
              className="confirmed-pic"
            />
            <p className="recovered-cases-count">{recoveredCasesCount}</p>
          </div>
          <div
            className="total-cases-container"
            testid="countryWideDeceasedCases"
          >
            <p className="deceased-card-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637933626/breathing_1_ozfip0.png"
              alt="country wide deceased cases pic"
              className="confirmed-pic"
            />
            <p className="deceased-cases-count">{deceasedCasesCount}</p>
          </div>
        </div>
        <div
          testid="stateWiseCovidDataTable"
          className="state-wise-covid-data-table"
        >
          <ul className="state-wise-insights-container">
            <header className="state-wise-insights-table-header" key="homelist">
              <div className="state-name-and-sort-list-container">
                <p className="state-name-heading">States/UT</p>
                <button
                  className="asc-sort-button"
                  testid="ascendingSort"
                  type="button"
                  onClick={sortDataInAsc}
                >
                  <FcGenericSortingAsc className="sort-icon" />
                </button>
                <button
                  className="asc-sort-button"
                  testid="descendingSort"
                  type="button"
                  onClick={sortDataInDesc}
                >
                  <FcGenericSortingDesc className="sort-icon" />
                </button>
              </div>
              <div className="cases-insights-container">
                <p className="insight-title">Confirmed</p>
              </div>
              <div className="cases-insights-container">
                <p className="insight-title">Active</p>
              </div>
              <div className="cases-insights-container">
                <p className="insight-title">Recovered</p>
              </div>
              <div className="cases-insights-container">
                <p className="insight-title">Deceased</p>
              </div>
              <div className="cases-insights-container">
                <p className="insight-title">Population</p>
              </div>
            </header>
            {convertedData.map(each => (
              <li className="state-wise-list-item" key={each.stateCode}>
                <div className="state-name-and-sort-list-container">
                  <p className="state-name">{each.name}</p>
                </div>
                <div className="cases-insights-list-container">
                  <p className="confirmed-list-count">{each.confirmed}</p>
                </div>
                <div className="cases-insights-list-container">
                  <p className="active-list-count">{each.active}</p>
                </div>
                <div className="cases-insights-list-container">
                  <p className="recovered-list-count">{each.recovered}</p>
                </div>
                <div className="cases-insights-list-container">
                  <p className="deceased-list-count">{each.deceased}</p>
                </div>
                <div className="cases-insights-list-container">
                  <p className="population-list-count">{each.population}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  onClickToRedirectToHome = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderOnFailure = () => (
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

  finalRenderStatesInsights = () => {
    const {dataFetchStatus} = this.state

    switch (dataFetchStatus) {
      case fetchConstants.success:
        return this.renderOnSuccess()
      case fetchConstants.loading:
        return this.renderOnLoading()
      case fetchConstants.failure:
        return this.renderOnFailure()
      default:
        return null
    }
  }

  render() {
    const {searchedState, statesSearchList} = this.state
    const showStateWiseInsights = searchedState !== ''
    const showHideStatesContainer = showStateWiseInsights
      ? 'hide-container'
      : 'state-insights-container'
    return (
      <div className="home-bg-container">
        <Header />
        <div className="input-search-container">
          <div className="search-container">
            <BsSearch className="search-emoji" />
          </div>
          <input
            className="search-states-container"
            type="search"
            value={searchedState}
            placeholder="Enter the state"
            onChange={this.onSearchOnState}
          />
        </div>
        <ul
          className="state-wise-search-list"
          testid="searchResultsUnorderedList"
        >
          {statesSearchList.map(eachState => (
            <FilteredState
              key={eachState.state_code}
              stateDetails={eachState}
            />
          ))}
        </ul>
        <div className={showHideStatesContainer}>
          {this.finalRenderStatesInsights()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Home
