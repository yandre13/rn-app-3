import { useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import createContext from './createContext'
import trackerApi from '../api/trackerApi'
import { navigate } from '../navigationRef'

const initialState = {
  errorMessage: '',
  token: null,
}
const authReducer = (state, action) => {
  switch (action.type) {
    case 'add_error':
      return { ...state, errorMessage: action.payload }
    case 'signup':
      return { errorMessage: '', token: action.payload }
    case 'signin':
      return { errorMessage: '', token: action.payload }
    case 'signout':
      return { errorMessage: '', token: null }
    case 'clear_error':
      return { ...state, errorMessage: '' }
    default:
      return state
  }
}

const actions = {
  signup:
    (dispatch) =>
    async ({ email, password }) => {
      try {
        const res = await (await trackerApi()).track(email, password, 'signup')
        await AsyncStorage.setItem('token', res.token)
        dispatch({ type: 'signup', payload: res.token })
        // navigate to mainFlow
        navigate('mainFlow')
      } catch (err) {
        dispatch({
          type: 'add_error',
          payload: 'Something went wrong with sign up',
        })
      }
    },
  signin:
    (dispatch) =>
    async ({ email, password }) => {
      try {
        const res = await (await trackerApi()).auth(email, password)
        await AsyncStorage.setItem('token', res.token)
        dispatch({ type: 'signin', payload: res.token })
        // navigate to mainFlow
        navigate('mainFlow')
      } catch (err) {
        dispatch({
          type: 'add_error',
          payload: 'Something went wrong with sign in',
        })
      }
    },
  signout: (dispatch) => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({ type: 'signout' })
    navigate('loginFlow')
  },
  clearErrorMessage: (dispatch) => () => dispatch({ type: 'clear_error' }),
  tryLocalSignin: (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token')
    if (token) {
      dispatch({ type: 'signin', payload: token })
      navigate('mainFlow')
    } else {
      navigate('loginFlow')
    }
  },
}

const { Context, Provider } = createContext(authReducer, actions, initialState)

export const AuthProvider = Provider

export const useAuth = () => {
  const value = useContext(Context)
  if (!value) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  const { state, signup, signin, clearErrorMessage, tryLocalSignin, signout } =
    value
  return { state, signup, signin, clearErrorMessage, tryLocalSignin, signout }
}
