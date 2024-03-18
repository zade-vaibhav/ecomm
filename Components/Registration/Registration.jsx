import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Button, Alert } from 'react-native'
import React, { useState } from 'react'

const Registration = ({ navigation }) => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    async function handelSubmit() {
        setIsSubmit(true)

        try {
            if (username == "" || password == "" || email == "") {
                Alert.alert("empty inputFeilds!!")
                setIsSubmit(false)
                return;
            }
            const user_name = username.trim()
            const user_email = email.trim()
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
          
            if (!emailRegex.test(user_email)) {
                Alert.alert("email should have proper format")
                setIsSubmit(false)
                return;
            }
            if (!passwordRegex.test(password)) {
                Alert.alert("At least one lowercase letter At least one uppercase letter At least one digit Minimum length of 8 characters.")
                setIsSubmit(false)
                return;
            }
            const responce = await fetch("https://ecomm-82tz.onrender.com/api/v1/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: user_name,
                    email: user_email,
                    password
                })
            })
            const res = await responce.json()
            if (res.success) {
                setIsSubmit(false)
                Alert.alert(res.message)
                setUsername("")
                setEmail("")
                setPassword("")
                navigation.navigate("Login")
                return;
            }
            Alert.alert(res.error.message)
            setIsSubmit(false)
        } catch (err) {
            setIsSubmit(false)
            Alert.alert(err)
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={styles.loginContainer}>
                <View style={styles.login_title}>
                    <Text style={{ fontSize: 25, fontWeight: 600 }}>Amazon-Register</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>UserName</Text>
                    <TextInput value={username} onChangeText={(e) => setUsername(e)} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10 }} placeholder='username' />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Email</Text>
                    <TextInput value={email} onChangeText={(e) => setEmail(e)} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10 }} placeholder='email' />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: "white" }}>Password</Text>
                    <TextInput value={password} onChangeText={(e) => setPassword(e)} secureTextEntry={true} style={{ borderWidth: 1, borderColor: "gray", width: 300, paddingLeft: 10, borderRadius: 5, marginTop: 10, marginBottom: 10 }} placeholder='password' />
                    {isSubmit?<Button style={styles.ragister_Button} title='wait...' />:<Button onPress={() => handelSubmit()} style={styles.ragister_Button} title='Register' />}
                    <Text style={{ marginTop: 10 }}>already registered? <Text onPress={() => navigation.navigate("Login")} style={{ color: "white" }}>Login</Text></Text>
                </View>
                <View style={styles.login_footer}>
                    <Text style={{ color: "black" }}>Safe and secure register with OurStore</Text>
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
        height: 500,
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
        height: 400,
        width: "100%",
        backgroundColor: "#37475A",
        justifyContent: "center",
        alignItems: "center"
    },
    ragister_Button: {
        marginTop: 20
    },
    login_footer: {
        flex: 1,
        backgroundColor: "#FEBD69",
        justifyContent: "center",
        alignItems: "center"
    },

})

export default Registration