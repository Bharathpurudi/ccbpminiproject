import {Link} from 'react-router-dom'
import {BiChevronRightSquare} from 'react-icons/bi'
import './index.css'

const FilteredState = props => {
  const {stateDetails} = props
  const updatedStateDetails = {
    stateCode: stateDetails.state_code,
    stateName: stateDetails.state_name,
  }
  const {stateCode, stateName} = updatedStateDetails
  return (
    <Link to={`/state/${stateCode}`} className="link-item">
      <li className="filtered-state-list-item">
        <p className="state-name">{stateName}</p>
        <div className="redirect-container">
          <p className="state-code">{stateCode}</p>
          <BiChevronRightSquare className="right-square-icon" />
        </div>
      </li>
    </Link>
  )
}

export default FilteredState
