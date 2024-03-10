import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../context/AuthContext'
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';

export default function Create() {
  const navigator = useNavigation()

  const [countries, setCountries] = useState([])
  const [cities, setCities] = useState([])
  const [requestObj, setRequestObj] = useState({})

  const [modeType, setModeType] = useState(0)
  const [movementType, setMovementType] = useState(0)
  const [incotermsType, setIncotermsType] = useState(0)
  const [packageType, setPackageType] = useState(0)
  const [unit1Type, setUnit1Type] = useState(0)
  const [unit2Type, setUnit2Type] = useState(0)
  const [currencyType, setCurrencyType] = useState(0)
  const [countryId, setCountryId] = useState(0)
  const [cityId, setCityId] = useState(0)

  const [modeTypes, setModeTypes] = useState([])
  const [movementTypes, setMovementTypes] = useState([])
  const [incotermsTypes, setIncotermsTypes] = useState([])
  const [packageTypes, setPackageTypes] = useState([])
  const [unit1Types, setUnit1Types] = useState([])
  const [unit2Types, setUnit2Types] = useState([])
  const [currencyTypes, setCurrencyTypes] = useState([])

  const [isModeFocus, setIsModeFocus] = useState(false);
  const [isMovementFocus, setIsMovementFocus] = useState(false);
  const [isIncotermsFocus, setIsIncotermsFocus] = useState(false);
  const [isPackageFocus, setIsPackageFocus] = useState(false);
  const [isUnit1Focus, setIsUnit1Focus] = useState(false);
  const [isUnit2Focus, setIsUnit2Focus] = useState(false);
  const [isCurrencyFocus, setIsCurrencyFocus] = useState(false);
  const [isCountryIdFocus, setIsCountryIdFocus] = useState(false);
  const [isCityIdFocus, setIsCityIdFocus] = useState(false);

  const handleCreate = async() => {
    setRequestObj({
      "modeType": modeType,
      "movementType": movementType,
      "incotermsType": incotermsType,
      "packageType": packageType,
      "unit1Type": unit1Type,
      "unit2Type": unit2Type,
      "currencyType": currencyType,
      "countryId": countryId,
      "cityId": cityId
    })

    await axios.post(API_URL + '/Offers', requestObj)
    .then((response) => {
      navigator.navigate('homePage')
    })
    .catch((error) => console.log(error.error))
  }

  const loadCitiesWithCountry = (id) => {
    setCountryId(id)
    const country = countries.find((item) => item.id === id)
    setCities(country.cities)
  }

  const getCommonValues = async() => {
    await axios.get(API_URL + '/CommonValues')
    .then((response) => {
      setModeTypes(response.data.data.enums.CurrencyTypes)
      setMovementTypes(response.data.data.enums.MovementTypes)
      setIncotermsTypes(response.data.data.enums.IncotermsTypes)
      setPackageTypes(response.data.data.enums.PackageTypes)
      setUnit1Types(response.data.data.enums.Unit1Types)
      setUnit2Types(response.data.data.enums.Unit2Types)
      setCurrencyTypes(response.data.data.enums.CurrencyTypes)
      setCountries(response.data.data.countries)
    })
    .catch((error) => console.log(error.error))
  }
  
  useEffect(() => {
    getCommonValues()
  }, [])

  return (
    <ScrollView>
      <View style={styles.container}>
        <Dropdown
          style = {styles.dropdown} 
          data={modeTypes} 
          labelField="label"
          valueField="value"
          onChange={item => setModeType(item.value)}
          onFocus={() => setIsModeFocus(true)}
          onBlur={() => setIsModeFocus(false)}
          placeholder={!isModeFocus ? "Mode Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={movementTypes} 
          labelField="label"
          valueField="value"
          onChange={item => setMovementType(item.value)}
          onFocus={() => setIsMovementFocus(true)}
          onBlur={() => setIsMovementFocus(false)}
          placeholder={!isMovementFocus ? "Movement Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={incotermsTypes} 
          labelField="label"
          valueField="value"
          onChange={item => setIncotermsType(item.value)}
          onFocus={() => setIsIncotermsFocus(true)}
          onBlur={() => setIsIncotermsFocus(false)}
          placeholder={!isIncotermsFocus ? "Incoterms Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={packageTypes} 
          labelField="label"
          valueField="value"
          onChange={item => setPackageType(item.value)}
          onFocus={() => setIsPackageFocus(true)}
          onBlur={() => setIsPackageFocus(false)}
          placeholder={!isPackageFocus ? "Package Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={unit1Types} 
          labelField="label"
          valueField="value"
          onChange={item => setUnit1Type(item.value)}
          onFocus={() => setIsUnit1Focus(true)}
          onBlur={() => setIsUnit1Focus(false)}
          placeholder={!isUnit1Focus ? "Unit - 1 Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={unit2Types} 
          labelField="label"
          valueField="value"
          onChange={item => setUnit2Type(item.value)}
          onFocus={() => setIsUnit2Focus(true)}
          onBlur={() => setIsUnit2Focus(false)}
          placeholder={!isUnit2Focus ? "Unit - 2 Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={currencyTypes} 
          labelField="label"
          valueField="value"
          onChange={item => setCurrencyType(item.value)}
          onFocus={() => setIsCurrencyFocus(true)}
          onBlur={() => setIsCurrencyFocus(false)}
          placeholder={!isCurrencyFocus ? "Currency Type" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={countries} 
          labelField="name"
          valueField="id"
          onChange={item => loadCitiesWithCountry(item.id)}
          onFocus={() => setIsCountryIdFocus(true)}
          onBlur={() => setIsCountryIdFocus(false)}
          placeholder={!isCountryIdFocus ? "Country" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <Dropdown
          style = {styles.dropdown} 
          data={cities} 
          labelField="name"
          valueField="id"
          onChange={item => setCityId(item.id)}
          onFocus={() => setIsCityIdFocus(true)}
          onBlur={() => setIsCityIdFocus(false)}
          placeholder={!isCityIdFocus ? "City" : '...'}
        />
        <View style={{marginBottom:15}}></View>

        <TouchableOpacity style={styles.btn} onPress={handleCreate}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  dropdown: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 30,
    paddingHorizontal: 8,
  },
  btn: {
    borderRadius: 30,
    backgroundColor: 'green',
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold'
  }
})