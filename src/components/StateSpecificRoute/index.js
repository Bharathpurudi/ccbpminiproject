import {Component} from 'react'
import Loader from 'react-loader-spinner'
import DataChart from '../DataChart'
import LineTrendChart from '../LineTrendChart'
import Header from '../Header'
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

class StateSpecificRoute extends Component {
  state = {
    fetchStatus: fetchConstants.initial,
    stateData: {},
    districtCasesInsight: 'confirmed',
    statesBarChartData: [],
    color: '#9A0E31',
  }

  componentDidMount() {
    this.getStateAndDistrictsInsights()
    this.getStateWiseTimeLinesData()
  }

  getStateAndDistrictsInsights = async () => {
    this.setState({fetchStatus: fetchConstants.loading})
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateApiUrl = 'https://apis.ccbp.in/covid19-state-wise-data'
    const response = await fetch(stateApiUrl)

    if (response.ok) {
      const responseData = await response.json()
      this.setState({stateData: responseData[stateCode]})
      const modifiedDistrictsData = this.convertObjectDataToArray(
        responseData[stateCode].districts,
      )
      this.setState({districtsData: modifiedDistrictsData})
      this.setState({fetchStatus: fetchConstants.success})
    } else {
      this.setState({fetchStatus: fetchConstants.failure})
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
        const vaccinated1 = total.vaccinated1 ? total.vaccinated1 : 0
        const vaccinated2 = total.vaccinated2 ? total.vaccinated2 : 0
        resultList.push({
          name: keyName,
          confirmed,
          deceased,
          recovered,
          tested,
          active: confirmed - (deceased + recovered),
          testPositivityRatio: (confirmed / tested) * 10,
          vaccinated1,
          vaccinated2,
        })
      }
    })
    return resultList
  }

  getStateWiseTimeLinesData = async () => {
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const timeLinesUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
    const response = await fetch(timeLinesUrl)
    if (response.ok) {
      const timeLinesData = await response.json()
      const datesData = timeLinesData[stateCode].dates
      const convertedDatesData = this.convertObjectDataToArray(datesData)
      this.setState({statesBarChartData: convertedDatesData})
    }
  }

  clickOnConfirmedCases = () => {
    this.setState(
      {districtCasesInsight: 'confirmed', color: '#9A0E31'},
      this.renderFinalDistrictsData,
    )
  }

  clickOnActiveCases = () => {
    this.setState(
      {districtCasesInsight: 'active', color: '#0A4FA0'},
      this.renderFinalDistrictsData,
    )
  }

  clickOnRecoveredCases = () => {
    this.setState(
      {districtCasesInsight: 'recovered', color: '#216837'},
      this.renderFinalDistrictsData,
    )
  }

  clickOnDeceasedCases = () => {
    this.setState(
      {districtCasesInsight: 'deceased', color: '#474C57'},
      this.renderFinalDistrictsData,
    )
  }

  renderOnDistrictsSuccess = () => {
    const {
      stateData,
      districtsData,
      districtCasesInsight,
      statesBarChartData,
      color,
    } = this.state
    const sortDistData = []
      .concat(districtsData)
      .sort((a, b) => b[districtCasesInsight] - a[districtCasesInsight])
    const totalTestedCount = stateData.total.tested
    const confirmedCases = stateData.total.confirmed
    const recoveredCases = stateData.total.recovered
    const deceasedCases = stateData.total.deceased
    const activeCases = confirmedCases - (recoveredCases + deceasedCases)
    const {match} = this.props
    const {params} = match
    const {stateCode} = params
    const stateName = statesList.find(state => state.state_code === stateCode)
      .state_name

    return (
      <div className="state-specific-container">
        <div className="state-name-tested-container">
          <h1 className="state-name-specific-route ">{stateName}</h1>
          <div className="testedCasesContainer">
            <p className="tested-text">Tested</p>
            <p className="tested-cases-count">{totalTestedCount}</p>
          </div>
        </div>
        <p className="last-updated-text">Last update on march 28th 2021.</p>
        <div className="nation-wide-cases-container">
          <div
            className="total-cases-container"
            testid="stateSpecificConfirmedCasesContainer"
          >
            <button
              type="button"
              onClick={this.clickOnConfirmedCases}
              className="card-button"
            >
              <p className="confirmed-card-text">Confirmed</p>
              <img
                src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637926976/check-mark_1_lhao9n.png"
                alt="state specific confirmed cases pic"
                className="confirmed-pic"
              />
              <p className="confirmed-cases-count">{confirmedCases}</p>
            </button>
          </div>
          <div
            className="total-cases-container"
            testid="stateSpecificActiveCasesContainer"
            onClick={this.clickOnActiveCases}
            role="button"
            tabIndex="0"
          >
            <p className="active-card-text">Active</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932347/protection_1_vxqdnb.png"
              alt="state specific active cases pic"
              className="confirmed-pic"
            />
            <p className="active-cases-count">{activeCases}</p>
          </div>
          <div
            className="total-cases-container"
            testid="stateSpecificRecoveredCasesContainer"
            onClick={this.clickOnRecoveredCases}
            role="button"
            tabIndex="0"
          >
            <p className="recovered-card-text">Recovered</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637932539/recovered_1_sxtfix.png"
              alt="state specific recovered cases pic"
              className="confirmed-pic"
            />
            <p className="recovered-cases-count">{recoveredCases}</p>
          </div>
          <div
            className="total-cases-container"
            testid="stateSpecificDeceasedCasesContainer"
            onClick={this.clickOnDeceasedCases}
            role="button"
            tabIndex="0"
          >
            <p className="deceased-card-text">Deceased</p>
            <img
              src="https://res.cloudinary.com/dhyg2tdfb/image/upload/v1637933626/breathing_1_ozfip0.png"
              alt="state specific deceased cases pic"
              className="confirmed-pic"
            />
            <p className="deceased-cases-count">{deceasedCases}</p>
          </div>
        </div>
        <h1 className="top-districts-heading">Top Districts</h1>
        <ul
          className="districts-insights-list"
          testid="topDistrictsUnorderedList"
        >
          {sortDistData.map(each => (
            <li className="district-insights-list-item" key={each.name}>
              <p className="district-count">
                {each[districtCasesInsight]} {each.name}
              </p>
            </li>
          ))}
        </ul>
        <DataChart
          chartsData={statesBarChartData}
          insight={districtCasesInsight}
          colorDetail={color}
        />
      </div>
    )
  }

  renderOnDistrictsLoading = () => (
    <div className="loader-container" testid="stateDetailsLoader">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  renderFinalDistrictsData = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchConstants.success:
        return this.renderOnDistrictsSuccess()
      case fetchConstants.loading:
        return this.renderOnDistrictsLoading()
      default:
        return null
    }
  }

  spreadTrendsOfStateWiseInsights = () => {
    const {statesBarChartData} = this.state
    return (
      <>
        <div className="line-charts-container" testid="lineChartsContainer">
          <LineTrendChart
            lineChartDetails={statesBarChartData}
            chartType="confirmed"
            trendColor="#FF073A"
            chartName="Confirmed"
          />
          <LineTrendChart
            lineChartDetails={statesBarChartData}
            chartType="active"
            trendColor="#007BFF"
            chartName="Total Active"
          />
          <LineTrendChart
            lineChartDetails={statesBarChartData}
            chartType="recovered"
            trendColor="#27A243"
            chartName="Recovered"
          />
          <LineTrendChart
            lineChartDetails={statesBarChartData}
            chartType="deceased"
            trendColor="#6C757D"
            chartName="Deceased"
          />
          <LineTrendChart
            lineChartDetails={statesBarChartData}
            chartType="tested"
            trendColor="#9673B9"
            chartName="Tested"
          />
        </div>
      </>
    )
  }

  renderOnTrendsLoading = () => (
    <div className="loader-container" testid=" timelinesDataLoader">
      <Loader type="Oval" color="#007BFF" height={50} width={50} />
    </div>
  )

  finalTrendsRendering = () => {
    const {fetchStatus} = this.state

    switch (fetchStatus) {
      case fetchConstants.success:
        return this.spreadTrendsOfStateWiseInsights()
      case fetchConstants.loading:
        return this.renderOnTrendsLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="specific-route-bg-container">
        <Header />
        {this.renderFinalDistrictsData()}
        <div className="spread-trends-container">
          <h1 className="spread-trends-heading">Spread Trends</h1>
          <div className="trends-buttons-container">
            <button className="cumulative-button" type="button">
              Cumulative
            </button>
            <button className="cumulative-button" type="button">
              Daily
            </button>
          </div>
        </div>
        {this.finalTrendsRendering()}
        <Footer />
      </div>
    )
  }
}

export default StateSpecificRoute
