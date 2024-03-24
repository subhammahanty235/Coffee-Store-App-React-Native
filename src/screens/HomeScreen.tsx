/* eslint-disable prettier/prettier */
import { Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View,ToastAndroid, } from 'react-native'
import React, { useRef, useState } from 'react'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme'
import HeaderBar from '../components/HeaderBar'
import CustomIcon from '../components/CustomIcon'
import { CoffeeCard } from '../components/Coffeecard'

const getCategoriesFromData = (data: any) => {
  let temp: any = {}
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }

  let categories = Object.keys(temp)
  categories.unshift('All');
  return categories;
}

const getCoffeeList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  }
  else {
    let coffeeList = data.filter((item: any) => item.name == category);
    return coffeeList
  }
}


const HomeScreen = ({navigation}:any) => {
  const CoffeeList = useStore((state: any) => state.CoffeeList)
  const BeanList = useStore((state: any) => state.BeanList)
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList))
  const [searchText, setSearchText] = useState("")
  const [categoryIndex, setCategoryIndex] = useState({
    index: 2,
    category: categories[2]
  })
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList))
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);


  const tabBarHeight = useBottomTabBarHeight();
  const ListRef: any = useRef<FlatList>();


  const searchCoffee = (search:string) => {
    if(search != ''){
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
    }

    setCategoryIndex({index:0 , category:categories[0]});
    setSortedCoffee([...CoffeeList?.filter((item:any) => item.name.toLowerCase().includes(search.toLowerCase()))])
  }

  const resetSearchCoffee = () =>{
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoryIndex({index:0 , category:categories[0]});
    setSortedCoffee([...CoffeeList])
   setSearchText("")
  }

  const CoffeCardAddToCart = ({
    id,
    index,
    name,
    roasted,
    imagelink_square,
    special_ingredient,
    type,
    prices,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      roasted,
      imagelink_square,
      special_ingredient,
      type,
      prices,
    });
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} is Added to Cart`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  };



  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        {/* App Header */}
        <HeaderBar/>
        <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you</Text>

        {/* search input */}

        <View style={styles.InputContainer}>
          <TouchableOpacity onPress={() => { searchCoffee(searchText)}}>
            <CustomIcon style={styles.InputIcon} name='search' size={FONTSIZE.size_18}
              color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
              
            />
          </TouchableOpacity>
          <TextInput placeholder='Find Your COffee...'
            value={searchText}
            onChangeText={(text) => {setSearchText(text); searchCoffee(text)}}
            placeholderTextColor={COLORS.primaryLightGreyHex}
            style={styles.TextInputContainer}
          />
  {
    searchText?.length > 0 ? (
      <TouchableOpacity onPress={() => {
        resetSearchCoffee();
      }}>
        <CustomIcon style={styles.InputIcon} name='close' size={FONTSIZE.size_16} color={COLORS.primaryLightGreyHex}/>
      </TouchableOpacity>
    ):
    (
      <></>
    )
  }

        </View>

        {/*category Scroller  */}
        <ScrollView horizontal
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {
            categories?.map((data, index) => (
              <View key={index.toString()} style={styles.CategoryScrollViewContainer}>
                <TouchableOpacity onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoryIndex({ index: index, category: categories[index] })
                  setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])

                }}
                  style={styles.CategoryScrollViewItem}>
                  <Text style={[
                    styles.CategoryText,
                    categoryIndex.index == index
                      ? { color: COLORS.primaryOrangeHex }
                      : {},
                  ]}>{data}</Text>
                  {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
                </TouchableOpacity>
              </View>
            ))
          }


        </ScrollView>
        {/* Coffee Flatlist */}

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={sortedCoffee}
          ref={ListRef}
          contentContainerStyle={styles.FlatListContainerStyle}
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>No Coffee Available</Text>
            </View>
          }
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.push('Details' , {
                index:item.index,
                id:item.id,
                type:item.type
              })}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            )
          }}

        />
        <Text style={styles.CoffeeBeansTitle}>Coffee Beans</Text>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={BeanList}
          contentContainerStyle={[styles.FlatListContainerStyle, { marginBottom: tabBarHeight }]}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.push('Details' , {
                index:item.index,
                id:item.id,
                type:item.type
              })}}>
                <CoffeeCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  buttonPressHandler={CoffeCardAddToCart}
                />
              </TouchableOpacity>
            )
          }}

        />


      </ScrollView>
    </View>
  )
}


const styles = StyleSheet.create({

  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30
  },
  TextInputContainer: {
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    flex: 1,


  },
  InputContainer: {
    margin: SPACING.space_24,
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: 'row',
    alignItems: 'center',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15
  },
  CategoryScrollViewItem: {
    alignItems: 'center'
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  FlatListContainerStyle: {
    gap: SPACING.space_20,
    paddingVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_30,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  EmptyListContainer:{
  width:Dimensions.get('window').width - SPACING.space_30*2,
  alignItems:'center',
  justifyContent:'center',
  paddingVertical:SPACING.space_36*2.6
  }

})
export default HomeScreen