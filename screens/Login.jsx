import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {onLogin} = useAuth()

  const handleLogin = async() => {
    onLogin(username, password)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>FORCEGET</Text>
      <TextInput
        style={styles.input}
        placeholder="E-Mail"
        value={username}
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity style={styles.btn} onPress={handleLogin}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 30
  },
  btn: {
    borderRadius: 30,
    backgroundColor: 'purple',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  },
  routerBtn: {
    width: '100%',
    padding: 5,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },  
  routerBtnTxt: {
    color: 'blue',
    textDecorationStyle : 'solid'
  },
  logo: {
    width: 300,
    height: 300,
    resizeMode: 'cover',
    marginBottom: 20
  },
  header: {
    textAlign: 'center',
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 30
  }
});