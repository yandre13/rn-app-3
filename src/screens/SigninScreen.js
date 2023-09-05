import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import AuthForm from '../components/AuthForm'
import { useAuth } from '../context/AuthProvider'
import Spacer from '../components/Spacer'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'

const SigninScreen = ({ navigation }) => {
  const { state, signin, clearErrorMessage } = useAuth()

  const handleSignin = ({ email, password }) => {
    signin({ email, password })
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        marginBottom: 160,
      }}
    >
      <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm onSubmit={handleSignin} errorMessage={state.errorMessage} />
      <NavLink to="Signup" text="Don't have an account? Sign up" />
    </View>
  )
}

SigninScreen.navigationOptions = () => {
  return {
    headerShown: false,
  }
}

export default SigninScreen
