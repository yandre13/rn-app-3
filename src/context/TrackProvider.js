import { useContext } from 'react'
import trackerApi from '../api/trackerApi'

const { default: createContext } = require('./createContext')

const initialState = {
  tracks: [],
}
const reducer = (state, action) => {
  switch (action.type) {
    case 'fetch_tracks':
      return { ...state, tracks: action.payload }
    default:
      return state
  }
}

const actions = {
  fetchTracks: (dispatch) => async () => {
    const res = await (await trackerApi()).tracks()
    dispatch({ type: 'fetch_tracks', payload: res })
    console.log('res', res)
  },
  createTrack: (dispatch) => async (name, locations) => {
    const res = await (await trackerApi()).track(name, locations)
    console.log('res', res)
  },
}

const { Context, Provider } = createContext(reducer, actions, initialState)

export const TrackProvider = Provider

export const useTrack = () => {
  const value = useContext(Context)
  if (!value) {
    throw new Error('useTrack must be used within an TrackProvider')
  }
  const { state, createTrack, fetchTracks } = value
  return { state, createTrack, fetchTracks }
}
