import { combineReducers } from 'redux'
import { robotReducer, cartReducer, selectedRobotReducer } from './robotsReducer'

const reducers = combineReducers({
  allRobots: robotReducer,
  cart: cartReducer,
  robot: selectedRobotReducer
})

export default reducers
