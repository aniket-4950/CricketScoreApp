
import React, { useState } from 'react'
import { Alert, Button, useWindowDimensions , ScrollView, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View , KeyboardAvoidingView } from 'react-native'
const logo = require("../assets/logo-no-background.png")
const facebook = require("../assets/facebook.png")
const linkedin = require("../assets/linkedin.png")
const gmail = require ("../assets/gmail-logo.png")


export default function LoginPage({username , password , setUsername, setPassword, onLogin , error , handleSignUp}) {
    const [click,setClick] = useState(false);

    
  const windowWidth = useWindowDimensions().width;
  const windowHeight = useWindowDimensions().height;
  console.log(windowHeight)
  console.log(windowWidth)
    
  return (
    <ScrollView >
    <SafeAreaView style={[styles.container , {width: windowWidth > 800 ? "100%" : "100%" , height : windowHeight > 800 ? 1250 : 800}]}>
        
        <Image source={logo} style={styles.image} resizeMode='contain' />

        <Text style={styles.title}>Login</Text>

        <View style={styles.inputView}>

            <TextInput style={styles.input}
                placeholder='EMAIL OR USERNAME'
                value={username} 
                onChangeText={setUsername} 
                autoCorrect={false}
                autoCapitalize='none' 
            />

            <TextInput style={styles.input} 
                placeholder='PASSWORD' 
                secureTextEntry 
                value={password} 
                onChangeText={setPassword} 
                autoCorrect={false}
                autoCapitalize='none'
            />

        </View>

        <View style={styles.rememberView}>

            <View style={styles.switch}>
                <Switch  value={click} onValueChange={setClick} trackColor={{true : "green" , false : "gray"}} />
                <Text style={[styles.rememberText , {fontSize : windowWidth > 700 ? 25 : 13 }]}>Remember Me</Text>
            </View>

            <View>
                <Pressable onPress={() => Alert.alert("Try to remember PLEASE")}>
                    <Text style={[styles.forgetText , {fontSize : windowWidth > 700 ? 25 : 13 }]}>Forgot Password?</Text>
                </Pressable>
            </View>

        </View>

        <View style={styles.buttonView}>
            <Pressable style={styles.button} >
                <Text style={styles.buttonText} onPress={onLogin}>LOGIN</Text>
            </Pressable>
            <Text style={[styles.optionsText, {fontSize : windowWidth > 700 ? 25 : 13 }]}>OR LOGIN WITH</Text>
        </View>
        
        <View style={styles.mediaIcons}>
                <Image source={facebook} style={[styles.icons , {width : windowWidth > 700 ? 60 : 40 , height : windowWidth > 700 ? 60 : 40}]}   />
                <Image source={gmail} style={[styles.icons , {width : windowWidth > 700 ? 60 : 40 , height : windowWidth > 700 ? 60 : 40}]}  />
                <Image source={linkedin} style={[styles.icons, {width : windowWidth > 700 ? 60 : 40 , height : windowWidth > 700 ? 60 : 40}]}  />
        </View>

        <Text style={[styles.footerText , {fontSize : windowWidth > 700 ? 25 : 13 }]}>Don't Have Account?
          <Pressable onPress={() => Alert.alert("You don't have the permission to do so")}>
            <Text style={[styles.signup , {fontSize : windowWidth > 700 ? 20 : 13 }]}>  Sign Up</Text>
          </Pressable>
        </Text>

    </SafeAreaView>
    </ScrollView>
  )
}


const styles = StyleSheet.create({
  container : {
    alignItems : "center",
    paddingTop: 70,
    backgroundColor : "#b8bbc6",
    height : "100%"
  },
  image : {
    height : 260,
    width : 270
  },
  title : {
    fontSize : 30,
    fontWeight : "bold",
    textTransform : "uppercase",
    textAlign: "center",
    paddingVertical : 40,
    color : "black",
    paddingTop : -20
  },
  inputView : {
    gap : 15,
    width : "100%",
    paddingHorizontal : 40,
    marginBottom  :5
  },
  input : {
    height : 50,
    paddingHorizontal : 20,
    borderColor : "#231f20",
    borderWidth : 1,
    borderRadius: 7,
  },
  rememberView : {
    width : "100%",
    paddingHorizontal : 50,
    justifyContent: "space-between",
    alignItems : "center",
    flexDirection : "row",
    marginBottom : 8
  },
  switch :{
    flexDirection : "row",
    gap : 1,
    justifyContent : "center",
    alignItems : "center"
    
  },
  rememberText : {
    // fontSize: 13,
  },
  forgetText : {
    // fontSize : 11,
    color : "red"
  },
  button : {
    backgroundColor : "#231f20",
    height : 45,
    borderColor : "gray",
    borderWidth  : 1,
    borderRadius : 5,
    alignItems : "center",
    justifyContent : "center",
    
  },
  buttonText : {
    color : "white"  ,
    fontSize: 18,
    fontWeight : "bold"
  }, 
  buttonView :{
    width :"100%",
    paddingHorizontal : 50
  },
  optionsText : {
    textAlign : "center",
    paddingVertical : 10,
    color : "gray",
    fontSize : 13,
    marginBottom : 6
  },
  mediaIcons : {
    flexDirection : "row",
    gap : 15,
    alignItems: "center",
    justifyContent : "center",
    marginBottom : 23
  },
  icons : {
    width : 40,
    height: 40,
  },
  footerText : {
    textAlign: "center",
    color : "gray",
  },
  signup : {
    color : "red",
    fontSize : 13
  }
})



