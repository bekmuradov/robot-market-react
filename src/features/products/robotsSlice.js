import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  robots: [],
  materials: [],
  robotsFilter: null,
  status: 'idle',
  error: null
}
// I deployed backend for this site to heroku
// so don't have to start server every time
// Fetches Data from server
export const fetchRobots = createAsyncThunk('robots/fetchRobots', async () => {
  const response = await axios.get('https://robots-server.herokuapp.com/api/robots')
  return response.data.data
})

const robotsSlice = createSlice({
  name: 'robots',
  initialState,
  reducers: {
    setFilterValue (state, action) {
      state.robotsFilter = action.payload
    }
  },
  extraReducers: {
    [fetchRobots.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchRobots.fulfilled]: (state, action) => {
      state.status = 'completed'
      // as the data comes without id field
      // will assign id before we set them in the state
      const robotsWithId = action.payload.map(robot => ({ ...robot, id: nanoid() }))
      // get all products materials
      // and set them in Set Obj to make sure the uniqueness of materials
      const materialsArr = Array.from(new Set(action.payload.map(robot => robot.material)))
      state.materials = materialsArr
      state.robots = state.robots.concat(robotsWithId)
    },
    [fetchRobots.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const { setFilterValue } = robotsSlice.actions

export default robotsSlice.reducer

export const getAllRobots = state => state.robots.robots

export const getRobotById = (state, robotId) => state.robots.robots.find(robot => robot.id === robotId)

export const getRobotMaterials = state => state.robots.materials

export const getFilterValue = state => state.robots.robotsFilter
