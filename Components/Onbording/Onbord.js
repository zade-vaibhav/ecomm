import React,{useEffect} from 'react'

import { View,Text, Button,StyleSheet } from 'react-native'

const Onbord = ({navigation}) => {

  useEffect(()=>{
    setTimeout(()=>{
      navigation.replace("Home")
    },2000)
  })

  return (
    <View style={styles.container}>
      <Text >Our Store</Text>
    </View>
  )
}

const styles=StyleSheet.create({
   container:{
    height:"100%",
    backgroundColor:"gray",
    display:"flex",
    justifyContent:"center",
    alignItems:"center"

   }
})

export default Onbord
