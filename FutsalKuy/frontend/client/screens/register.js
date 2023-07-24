import { StyleSheet, Text, View, Button, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerClient } from "../store/actionCreators/userCreators";
const backImage = require("../assets/backImage.jpg");
const RegisterScreen = ({ navigation }) => {
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [address, setAddress] = useState('')

    const dispatch = useDispatch()
    const onRegister = () => {
        if(email == '' || password == ''){
            Alert.alert("Enter Wrong","Please Check Again")
        } else{
            dispatch(registerClient({username, email, password, phoneNumber, address}))
            .then(() => {
                console.log("Create Akun Sukses");
                navigation.navigate('Login')
            })
            .catch((err) => {
                Alert.alert("Register error", err)
            })
        }
    }
    return (
        <View style={styles.container}>
            <Image source={backImage} style={styles.backImage} />
            <View style={styles.whiteSheet} />
            <SafeAreaView style={styles.form}>
            <Text style={styles.title}>Sign Up</Text>
            <TextInput
            style={styles.input}
            placeholder="Enter Username"
            autoCapitalize="none"
            autoFocus={true}
            value={username}
            onChangeText={setUserName}
            />
            <TextInput
            style={styles.input}
            placeholder="Enter email"
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoFocus={true}
            value={email}
            onChangeText={setEmail}
            />
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            textContentType="password"
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Phone Number"
            autoCapitalize="none"
            autoFocus={true}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            />
          <TextInput
            style={styles.input}
            placeholder="Enter address"
            autoCapitalize="none"
            autoFocus={true}
            value={address}
            onChangeText={setAddress}
            />
          <TouchableOpacity style={styles.button} onPress={onRegister}>
            <Text style={{fontWeight: 'bold', color: '#fff', fontSize: 18}}> Sign Up</Text>
          </TouchableOpacity>
          <View style={{marginTop: 20, flexDirection: 'row', alignItems: 'center', alignSelf: 'center'}}>
            <Text style={{color: 'gray', fontWeight: '600', fontSize: 14}}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={{color: '#62d8e3', fontWeight: '600', fontSize: 14}}> Log In</Text>
            </TouchableOpacity>
          </View>
          </SafeAreaView>
          <StatusBar barStyle="light-content" />
        </View>
      );
    }
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: "#76c7cf",
        alignSelf: "center",
        paddingBottom: 24,
      },
      input: {
        backgroundColor: "#F6F7FB",
        height: 58,
        marginBottom: 20,
        fontSize: 16,
        borderRadius: 10,
        padding: 12,
      },
      backImage: {
        width: "100%",
        height: 340,
        position: "absolute",
        top: 0,
        resizeMode: 'cover',
      },
      whiteSheet: {
        width: '100%',
        height: '95%',
        position: "absolute",
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 60,
      },
      form: {
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 30,
      },
      button: {
        backgroundColor: '#40bcc7',
        height: 58,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
      },
    });


export default RegisterScreen;