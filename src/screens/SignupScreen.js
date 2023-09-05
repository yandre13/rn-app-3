import React from 'react'
import { View } from 'react-native'
import { useAuth } from '../context/AuthProvider'
import AuthForm from '../components/AuthForm'
import NavLink from '../components/NavLink'
import { NavigationEvents } from 'react-navigation'

const SignupScreen = () => {
  const { state, signup, clearErrorMessage } = useAuth()

  const handleSignup = ({ email, password }) => {
    signup({ email, password })
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
      <AuthForm
        signup
        onSubmit={handleSignup}
        errorMessage={state.errorMessage}
      />
      <NavLink to="Signin" text="Already have an account? Sign in" />
    </View>
  )
}

SignupScreen.navigationOptions = () => {
  return {
    headerShown: false,
  }
}

export default SignupScreen
