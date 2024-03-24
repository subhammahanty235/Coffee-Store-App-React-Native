import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';
interface GradientBGIconProps {
    name: string;
    color:string;
    size: number;
}

const GradientIcon:React.FC<GradientBGIconProps> = ({name, color, size}) => {
  return (
    <View style={styles.Container}>
      <LinearGradient
       style={styles.LinearGradientBG} 
       colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
       start={{x:0 , y:0}}
       end={{x:1 , y:1}}
       >
        <CustomIcon name={name} color={color} size={size}/>
      </LinearGradient>
    </View>
  )
}

export default GradientIcon

const styles = StyleSheet.create({
    Container:{
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: SPACING.space_12,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor: COLORS.primaryBlackRGBA,
        overflow:'hidden'
    },
    LinearGradientBG:{
        height:SPACING.space_32,
        width:SPACING.space_32,
        alignItems:"center",
        justifyContent:"center",
    }
})