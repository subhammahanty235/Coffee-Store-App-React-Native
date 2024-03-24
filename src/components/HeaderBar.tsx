import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import GradientIcon from './GradientIcon'
import ProfilePic from './ProfilePic'

interface HeaderBarProps {
    title? : String,

}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientIcon color={COLORS.primaryLightGreyHex} size={FONTSIZE.size_16} name='menu' />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic/>
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
  HeaderContainer:{
    padding: SPACING.space_30,
    flexDirection:'row',
    alignItems:'center',
    justifyContent: 'space-between'

  },
  HeaderText:{
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize:FONTSIZE.size_20,
    color:COLORS.primaryWhiteHex
  }
})