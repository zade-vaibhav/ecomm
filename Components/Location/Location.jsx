import { View, Text,StyleSheet } from 'react-native'
import React from 'react'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

const Location = () => {
  return (
    <View style={styles.container}>
     <MaterialIcons style={{paddingHorizontal:5}} name="location-pin" size={20} color="gray"/>
     <Text style={{fontSize:15,alignItems:"center"}}>Deliver to user-Chandrapur</Text>
     <AntDesign style={{paddingHorizontal:5}} name="down" size={15} color="black"/>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        height:30,
        backgroundColor:"#37475A",
        flexDirection:"row",
        alignItems:"center",
        paddingHorizontal:10
    }

})

export default Location