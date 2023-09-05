import { useContext } from 'react'
import createContext from './createContext'

const initialState = {
  recording: false,
  locations: [],
  currentLocation: null,
  name: '',
}
const locationReducer = (state, action) => {
  switch (action.type) {
    case 'add_current_location':
      return { ...state, currentLocation: action.payload }
    case 'start_recording':
      return { ...state, recording: true }
    case 'stop_recording':
      return { ...state, recording: false }
    case 'add_to_locations':
      return { ...state, locations: [...state.locations, action.payload] }
    case 'change_name':
      return { ...state, name: action.payload }
    case 'reset':
      return { ...state, name: '', locations: [] }
    default:
      return state
  }
}

const actions = {
  startRecording: (dispatch) => () => {
    dispatch({ type: 'start_recording' })
  },
  stopRecording: (dispatch) => () => {
    dispatch({ type: 'stop_recording' })
  },
  addLocation: (dispatch) => (location, recording) => {
    dispatch({ type: 'add_current_location', payload: location })
    // console.log('recording: ', recording)
    if (recording) {
      dispatch({ type: 'add_to_locations', payload: location })
    }
  },
  changeName: (dispatch) => (name) => {
    dispatch({ type: 'change_name', payload: name })
  },
  reset: (dispatch) => () => dispatch({ type: 'reset' }),
}

const { Context, Provider } = createContext(
  locationReducer,
  actions,
  initialState
)

export const LocationProvider = Provider

export const useLocation = () => {
  const value = useContext(Context)
  if (!value) {
    throw new Error('useLocation must be used within an LocationProvider')
  }
  const {
    state,
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  } = value
  return {
    state,
    startRecording,
    stopRecording,
    addLocation,
    changeName,
    reset,
  }
}
