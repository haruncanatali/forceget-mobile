import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const formatKey = (key) => {
  const formattedKey = key.charAt(0).toUpperCase() + key.slice(1);
  const separatedKey = formattedKey.replace(/([A-Z])/g, ' $1');
  return separatedKey;
};

const Card = ({ data }) => {
  return (
    <View style={styles.card}>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.property}>
          <Text style={styles.propertyName}>{formatKey(key)}</Text>
          <Text style={styles.propertyValue}>{value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    margin: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  property: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    letterSpacing: 1
  },
  propertyName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  propertyValue: {
    fontSize: 16,
  },
});

export default Card;
