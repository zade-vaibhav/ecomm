import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const ChangePassword = ({navigation,route}) => {

  const { token } = route.params;
  console.log(token)

  const [password,setPassword]=useState("")
  const [cPassword,setCPassword]=useState("")
  const [isSubmit, setIsSubmit] = useState(false)



  async function handelUpdate(){

    setIsSubmit(true)

    if(password=="" || cPassword==""){
      Alert.alert("empty InputField!!")
      setIsSubmit(false)
      return;
    }
    if(password=="" !== cPassword==""){
      Alert.alert("Password must be same!!")
      setIsSubmit(false)
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          
    if (!passwordRegex.test(password)) {
        Alert.alert("password should have proper format")
        setIsSubmit(false)
        return;
    }

    try{
      const responce=await fetch("https://ecomm-82tz.onrender.com/api/v1/auth/resetpassword/update",{
          method:"POST",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
         body:JSON.stringify({password})
      })

      const res=await responce.json()

      if (res.success) {
          setIsSubmit(false)
          Alert.alert(res.message)
          navigation.replace("Login")
          return;
      }
      setIsSubmit(false)
      Alert.alert(res.message)

  }catch(err){
      setIsSubmit(false)
      Alert.alert('Error', err.message)
  }

  }

  return (
    <View style={styles.container}>
    <KeyboardAvoidingView style={styles.loginContainer}>
        <View style={styles.login_title}>
            <Text style={{ fontSize: 25, fontWeight: 600 }}>Amazon-Update-password</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>New-Password</Text>
            <TextInput value={password} onChangeText={(e) => setPassword(e)} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10, marginBottom: 20 }} placeholder='new password' />
            <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Conform-Password</Text>
            <TextInput value={cPassword} onChangeText={(e) => setCPassword(e)} secureTextEntry={true} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10, marginBottom: 20 }} placeholder='conform password' />
            {!isSubmit ? <Button onPress={() => handelUpdate()} title='Update' /> : <Button title="wait..." />}
        </View>
        <View style={styles.login_footer}>
            <Text style={{ color: "black" }}>legal and privacy policy with OurStore</Text>
        </View>
    </KeyboardAvoidingView>
</View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center"

  },
  loginContainer: {
      height: 400,
      width: 400,
      borderWidth: 1,
      borderColor: "gray",
      borderRadius: 10,
      overflow: "hidden"

  },
  login_title: {
      height: 50,
      width: "100%",
      backgroundColor: '#232F3E',
      justifyContent: "center",
      alignItems: "center"
  },
  inputContainer: {
      height: 300,
      width: "100%",
      backgroundColor: "#37475A",
      justifyContent: "center",
      alignItems: "center"
  },
  login_footer: {
      flex: 1,
      backgroundColor: "#FEBD69",
      justifyContent: "center",
      alignItems: "center"
  },

})

export default ChangePassword