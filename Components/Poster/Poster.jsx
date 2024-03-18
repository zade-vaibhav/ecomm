
import React from 'react'
import { View, Text,Image,Dimensions,StyleSheet } from 'react-native'

const Poster = () => {
    const width=Dimensions.get("screen").width
  return (
    <View style={{height:200,width:width,paddingHorizontal:15}}>
     <Image style={{height:200}} source={{uri:"https://images-eu.ssl-images-amazon.com/images/G/31/img21/OHL/Budget/Unrec/GW/BS_2X_PC_1._CB580097921_.jpg"}}/>
    </View>
  )
}


export default Poster