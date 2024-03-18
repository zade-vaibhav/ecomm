import React,{useEffect} from 'react'
import { View,Text, Button, SafeAreaView,StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import Navbar from '../Navbar/Navbar'
import Location from '../Location/Location'
import Product from '../Horizontal_product/Product'
import Poster from '../Poster/Poster'

const Home = ({navigation}) => {
  
  return (
    <SafeAreaView style={styles.home}>
      <Navbar navigation={navigation}/>
      <Location/>
      <Product/>
      <Poster/>
    </SafeAreaView>
  )
}


const styles=StyleSheet.create({
 home:{
  height:"100%",
  width:"100%",
  // backgroundColor:"blue"
 }
  
})

export default Home
