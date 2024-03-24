import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import Details from './src/screens/Details';
import PaymentScreen from './src/screens/PaymentScreen';
import TabNavigator from './src/navigators/TabNavigator';

const stack = createNativeStackNavigator()
const App = () => {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Screen name='Tab' component={TabNavigator} options={{animation:'slide_from_bottom'}}></stack.Screen>
        <stack.Screen name='Details' component={Details} options={{animation:'slide_from_bottom'}}></stack.Screen>
        <stack.Screen name='Payment' component={PaymentScreen} options={{animation:'slide_from_bottom'}}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  )
}

export default App