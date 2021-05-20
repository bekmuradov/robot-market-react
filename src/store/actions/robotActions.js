import { ActionTypes } from '../constants/actionTypes'

export const setRobots = (robots) => {
  return {
    type: ActionTypes.SET_ROBOTS,
    payload: robots
  }
}

export const addToCart = (robot) => {
  return {
    type: ActionTypes.ADD_TO_CART,
    payload: robot
  }
}

export const removeFromCart = (robot) => {
  return {
    type: ActionTypes.REMOVE_FROM_CART,
    payload: robot
  }
}

export const selectedRobot = (robot) => {
  return {
    type: ActionTypes.SELECTED_ROBOT,
    payload: robot
  }
}

export const removeSelectedRobot = () => {
  return {
    type: ActionTypes.REMOVE_SELECTED_ROBOT
  }
}
