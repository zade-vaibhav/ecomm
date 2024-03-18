import React from 'react';
import { Text, View, Image, StyleSheet, Button } from 'react-native';
import cart from '../../Assets/cart.png';
import { addListener } from '@reduxjs/toolkit';
import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import Cart from "react-native-vector-icons/Feather"

function Navbar({navigation}) {
  return (
    <View style={styles.container}>
      <Image
        style={{ height:15, width: 50,marginRight:5 }}
        source={require('../../Assets/amazonlogo.png')}
      />

      <View
        style={{
          flex: 1,
          height: 40,
          borderWidth: 1,
          borderColor: 'gray',
          flexDirection: 'row',
          alignItems:"center",
          borderRadius:7,
          backgroundColor:"white"
        }}>
        <TextInput style={styles.input} placeholderTextColor={"gray"} placeholder="search Amazon.in" />
        <View style={{height:"100%",width:40,borderRadius:7,backgroundColor:"#FEBD69",alignItems:"center",justifyContent:"center"}}>
        <Feather style={{}} name="search" size={20} color="gray" />
        </View>
        
      </View>
      <View style={{marginHorizontal:5}}>
       <FontAwesome5 name="user-alt" size={20} color="gray"/>
       <Text style={{color:"white"}}>user</Text>
       </View>
      <Button onPress={()=>navigation.navigate("Login")} title='login'/>
      <Cart style={{marginHorizontal:5}} name="shopping-cart" size={25} color="white"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#232F3E',
    padding: 5,
    paddingRight:10,
    position:"relative",
  },
  input: {
    flex: 1,
    paddingHorizontal: 8,
    color: 'black',
    marginRight: 5,
    borderRadius: 5,    
  },
});

export default Navbar;
