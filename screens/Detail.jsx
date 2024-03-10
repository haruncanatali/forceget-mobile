import { StyleSheet, View } from 'react-native'
import React from 'react'
import Card from '../components/Card'

export default function Detail({route}) {
    const {offer} = route.params
  return (
    <View style={styles.container}>
      <Card data={offer} />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
  });