import { View, Text,StyleSheet,TextInput, KeyboardAvoidingView, Button,Alert} from 'react-native'
import React,{useState} from 'react'
import { Navigate } from 'react-router-dom'

const Login = ({navigation}) => {

  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [isSubmit, setIsSubmit] = useState(false)

  async function handelLogin(){
   setIsSubmit(true)
    if(email=="" || password==""){
      Alert.alert("empty inputFields!!")
      setIsSubmit(false)
      return;
    }

    try{
     
    const responce = await fetch("https://ecomm-82tz.onrender.com/api/v1/auth/login", {
      method: "POST",
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          email,
          password
      })
  })
     
  const res=await responce.json()

    if(res.success){
      Alert.alert("login successfull..")
      setIsSubmit(false)
      setEmail("")
      setPassword("")
      navigation.navigate("Home")
      return;
    }
    
    Alert.alert(res.error.message)
    setIsSubmit(false)
    return;

  }catch(err){
    setIsSubmit(false)
    Alert.alert(err)
  }
     
  }

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView style={styles.loginContainer}>
       <View style={styles.login_title}>
        <Text style={{fontSize:25,fontWeight:600}}>Amazon-Login</Text>
       </View>
       <View style={styles.inputContainer}>
        <Text style={{fontSize:20,fontWeight:600,color:"white"}}>Email</Text>
        <TextInput value={email} onChangeText={(e)=>setEmail(e)} style={{borderWidth:1,borderColor:"gray",width:300,paddingLeft:10,borderRadius:5,marginTop:10}} placeholder='email'/>
        <Text style={{fontSize:20,fontWeight:600,color:"white"}}>Password</Text>
        <TextInput value={password} onChangeText={(e)=>setPassword(e)} secureTextEntry={true} style={{borderWidth:1,borderColor:"gray",width:300,paddingLeft:10,borderRadius:5,marginTop:10}} placeholder='password'/>
        <Text onPress={()=>navigation.navigate("EmailPage")} style={{marginBottom:20,marginTop:10,color:"white"}}>forget password?</Text>
        {!isSubmit?<Button onPress={()=>handelLogin()} title='Login'/>:<Button title="wait..."/>}
        <Text style={{marginTop:10}}>don't have account? <Text onPress={()=>navigation.navigate("Registration")} style={{color:"white"}}>Register</Text></Text>
       </View>
       <View style={styles.login_footer}>
        <Text style={{color:"black"}}>Safe and secure login with OurStore</Text>
       </View>
      </KeyboardAvoidingView>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
       justifyContent:"center",
       alignItems:"center"
       
    },
loginContainer:{
    height:400,
    width:400,
    borderWidth:1,
    borderColor:"gray",
    borderRadius:10,
    overflow:"hidden"
   
},
login_title:{
height:50,
width:"100%",
backgroundColor: '#232F3E',
justifyContent:"center",
    alignItems:"center"
},
inputContainer:{
    height:300,
    width:"100%",
    backgroundColor:"#37475A",
    justifyContent:"center",
    alignItems:"center"
},
login_footer:{
    flex:1,
    backgroundColor:"#FEBD69",
    justifyContent:"center",
       alignItems:"center"
},

})
export default Login