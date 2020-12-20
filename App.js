// In App.js in a new project

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { FlatList } from 'react-native-gesture-handler';


const HomeScreen = ({ navigation, route }) => {
  const [btnDisable, setBtnDisable] = useState(true)
  const [origPrice, setOrigPrice] = useState(0);
  const [disPrice, setDisPrice] = useState(0);
  const [saving, setSaving] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [list, setList] = useState([
    { id: 1, saved: 100, finalP: 20 }]);

  const discountFinder = (origPrice, disPrice) => {
    setDisPrice(disPrice);
    let discount = (disPrice / 100) * (origPrice);
    if (disPrice > 100) {
      Alert.alert('Discount should not be greater than 100');
      setSaving(0);
      setFinalPrice(0);
    }
    else if (disPrice.toString().length == 0) {
      setBtnDisable(true);
      setSaving(discount);
      setFinalPrice(origPrice - discount);
    }
    else if (disPrice.toString().length != 0) {
      setBtnDisable(false);
      setSaving(discount);
      setFinalPrice(origPrice - discount);
    }
    else if (origPrice.toString().length > 0) {
      setBtnDisable(false);
      setSaving(discount);
      setFinalPrice(origPrice - discount);
    }
    else {
      setDisPrice(disPrice);
      setSaving(discount);
      setFinalPrice(origPrice - discount);
    }
  }

  const saveHandler = () => {
    setList(prevItems => [...prevItems, {
      id: Math.random(),
      saved: saving,
      finalP: finalPrice
    }]);
    Alert.alert('Data has been saved!!');

  }
  return (
    <View style={ styles.container }>
      <View style={ { alignSelf: 'center' } }>
        <View style={ styles.row }>
          <Text style={ { color: 'black' } }>Enter Original Price</Text>
          <TextInput
            keyboardType={ 'number-pad' }
            style={ styles.input }
            onChangeText={ setOrigPrice }
          />
        </View>
        <View style={ styles.row }>
          <Text>Enter Discount (%)</Text>
          <TextInput
            keyboardType={ 'number-pad' }
            style={ styles.input }
            onChangeText={ (val) => discountFinder(origPrice, val) }
          />
        </View>
      </View>

      <View style={ styles.row }>
        <View style={ { marginLeft: 40, width: 90 } }>
          <Button
            disabled={ btnDisable }
            title={ '      Save       ' }
            onPress={ () => saveHandler() }
            style={ styles.button } />
        </View>
        <TouchableOpacity
          onPress={ () => navigation.navigate('History', { dis: disPrice, originalPrice: origPrice, saved: saving, finalP: finalPrice }) }
          style={ styles.button }><Text style={ styles.btnText }>History</Text></TouchableOpacity>
      </View>
      <View>
        {/* Display Results*/ }
        <View style={ styles.resultSection }>
          {/*Result Section */ }
          <Text style={ { textAlign: 'center', color: '#fff', fontSize: 20, fontWeight: 'bold' } }> Result</Text>
          <View style={ styles.displayResult }>
            <Text>Final Price = { finalPrice }</Text>
            <Text>You Save =   { saving }</Text>
          </View>

        </View>
      </View>
    </View>
  );
}

const HistoryScreen = ({ navigation, route }) => {
  const [origPrice, setOrigPrice] = useState(route.params.originalPrice);
  const [disPrice, setDisPrice] = useState(route.params.dis);
  const [saving, setSaving] = useState(route.params.finalP);


  const deleteHistoryHandler = () => {
    setOrigPrice();
    setDisPrice();
    setSaving();
  }
  return (
    <View>
      <View style={ styles.row }>
        <Text> Original Price(Rs)     -  </Text>
        <Text> Discount %    =  </Text>
        <Text>Final Price(Rs) </Text>
      </View>
      <View style={ styles.row }>
        <Text> { origPrice }(Rs)               -       </Text>
        <Text>     { disPrice } %          =</Text>
        <Text>       { saving }(Rs)              </Text>

      </View>
      <View>
        <TouchableOpacity
          onPress={ () => deleteHistoryHandler() }
          style={ { height: 70, width: 100, backgroundColor: 'coral', paddingTop: 20, left: 130, borderRadius: 10, top: 20 } }><Text style={ { color: '#fff', fontSize: 15, left: 4 } }>Delete History</Text></TouchableOpacity>
      </View>
    </View>

  );
}




const Stack = createStackNavigator();

function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={ HomeScreen }
          options={ {
            title: "Discount App", headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: 'coral'
            }
          } }
        />
        <Stack.Screen
          name="History"
          component={ HistoryScreen }
          options={ {
            title: "History", headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: 'coral'
            }
          } }
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  input: {
    marginHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
    width: '50%',
    padding: 4,
    borderColor: 'coral'

  },
  row: {
    marginHorizontal: 25,
    flexDirection: 'row',
    marginTop: 40,
    padding: 4
  },
  button: {
    width: 80,
    height: 45,
    borderRadius: 5,
    backgroundColor: 'coral',
    marginLeft: 20,
    alignItems: 'center',
    marginLeft: 50
  },
  btnText: {
    textAlign: 'center',
    marginTop: 10
  },
  resultSection: {
    alignSelf: 'center',
    backgroundColor: 'coral',
    height: 200,
    width: '70%',
    borderRadius: 8,
    marginTop: 10
  },
  displayResult: {
    alignItems: 'center',
    marginTop: 30,

  }

})

export default App;