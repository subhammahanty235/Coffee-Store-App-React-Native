import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import CartScreen from '../screens/CartScreen'
import FavouriteScreen from '../screens/FavouriteScreen'
import OrderHistoryScreen from '../screens/OrderHistoryScreen'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { COLORS } from '../theme/theme'
import { BlurView } from '@react-native-community/blur'
import CustomIcon from '../components/CustomIcon'

const Tab = createBottomTabNavigator()
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarHideOnKeyboard:true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: ()=> (
            <BlurView overlayColor='' blurAmount={15} style={styles.blurViewStyles} />
        )

        }}>
        <Tab.Screen name='Home' component={HomeScreen} options={{
            tabBarIcon: ({focused,color, size}) => (
                <CustomIcon
                name='home'
                size={25}
                color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
                />
            )
        }}></Tab.Screen>
        <Tab.Screen name='Cart' component={CartScreen} options={{
            tabBarIcon: ({focused,color, size}) => (
                <CustomIcon
                name='cart'
                size={25}
                color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
                />
            )
        }}></Tab.Screen>
        <Tab.Screen name='Favourite' component={FavouriteScreen} options={{
            tabBarIcon: ({focused,color, size}) => (
                <CustomIcon
                name='like'
                size={25}
                color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
                />
            )
        }}></Tab.Screen>
        <Tab.Screen name='History' component={OrderHistoryScreen} options={{
            tabBarIcon: ({focused,color, size}) => (
                <CustomIcon
                name='bell'
                size={25}
                color={
                    focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex
                }
                />
            )
        }}></Tab.Screen>


    </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    tabBarStyle : {
        height: 60,
        position:'absolute',
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopWidth:0,
        elevation: 0,
        borderTopColor: 'transparent',
    },
    blurViewStyles: {
        position : 'absolute',
        top: 0,
        bottom :0,
        left : 0,
        right: 0,

    }

})