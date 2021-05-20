import { ActionTypes } from '../constants/actionTypes'

const initialState = {
  products: {
    data: [
      {
        id: 1,
        name: 'Beck'
      }
    ]
  }
}

export const robotReducer = (state = initialState, { type, payload }) => {
  switch (type) {
  case ActionTypes.SET_ROBOTS:
    return { ...state, products: payload }
  default:
    return state
  }
}

export const cartReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case ActionTypes.ADD_TO_CART:
    return { ...state, ...payload }
  case ActionTypes.REMOVE_FROM_CART:
    return { ...state }
  default:
    return state
  }
}

export const selectedRobotReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case ActionTypes.SELECTED_ROBOT:
    return { ...state, ...payload }
  case ActionTypes.REMOVE_SELECTED_ROBOT:
    return {}
  default:
    return state
  }
}
