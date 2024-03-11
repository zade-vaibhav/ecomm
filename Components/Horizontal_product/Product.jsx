import { View, Text,ScrollView,StyleSheet,Image,Pressable } from 'react-native'
import React from 'react'
import { Categories } from '../Data/category'

const Product = () => {
  return (
    <View style={{height:100,padding:10}}>
    <ScrollView showsHorizontalScrollIndicator={false} horizontal style={styles.container}>
        {
            Categories.map((ele,ind)=>{
                return  <Pressable style={{height:20,paddingHorizontal:5,alignItems:"center"}} key={ind}>
                <Image style={{height:50,width:50,objectFit:"cover",borderRadius:10}} source={{uri:`${ele.image}`}}/>
                <Text style={{color:"black"}}>{ele.title}</Text>
              </Pressable>
            })
        }
    </ScrollView>
    </View>
  )
}

const styles=StyleSheet.create({
   container:{
    padding:5
   }
})

export default Product