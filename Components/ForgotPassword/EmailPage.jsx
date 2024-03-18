import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, Alert } from 'react-native'
import React, { useState } from 'react'


const EmailPage = ({navigation}) => {

    const [email, setEmail] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    async function handelSent() {

        setIsSubmit(true)
        if (email == "") {
            setIsSubmit(false)
            return Alert.alert("empty inputField!!")
        }

        console.log(email)
        try {
            const responce = await fetch("https://ecomm-82tz.onrender.com/api/v1/auth/resetpassword/email/otp", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email })
            })

            const res = await responce.json();

            if (res.success) {
                setIsSubmit(false)
                Alert.alert(res.message)
                navigation.navigate("EmailOtp",{token:res.user.token})
                return;
            }
            setIsSubmit(false)
            Alert.alert(res.message)
        } catch (err) {
            setIsSubmit(false)
            Alert.alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.loginContainer}>
                <View style={styles.login_title}>
                    <Text style={{ fontSize: 25, fontWeight: 600 }}>Amazon-Verify</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Email</Text>
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10, marginBottom: 20 }} placeholder='registered email' />

                    {!isSubmit ? <Button onPress={() => handelSent()} title='Send-OTP' /> : <Button title="wait..." />}
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

export default EmailPage