import React, { useState } from 'react'
import Spacer from './Spacer'
import { Button, Input, Text } from 'react-native-elements'

const AuthForm = ({ signup, onSubmit, errorMessage }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const title = signup ? 'Sign Up' : 'Sign In'

  const handleSubmit = () => {
    onSubmit({ email, password })
  }

  return (
    <>
      <Spacer>
        <Text h3>{title} for Tracker</Text>
      </Spacer>
      <Input
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        inputMode="email"
      />
      <Spacer />
      <Input
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={{ color: 'red', marginLeft: 12 }}>{errorMessage}</Text>
      ) : null}
      <Spacer>
        <Button title={title} onPress={handleSubmit} />
      </Spacer>
    </>
  )
}

export default AuthForm
