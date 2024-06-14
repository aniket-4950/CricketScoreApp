import React, { useState } from 'react';
import { View, Button, StatusBar, StyleSheet , Alert , Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LiveScores from './components/LiveScores';
import LoginPage from './components/LoginPage';
import SignUpPage from './components/SignUpPage';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSignUp , setIsSignUp] = useState(false);

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      setIsLoggedIn(true);
      setError('');
    }
    else if(!username && !password){
      Alert.alert("You can not login without username and password")
    }
    else if(!username){
      Alert.alert("Please enter a valid username")
    } 
    else if(!password){
      Alert.alert("Password field cannot be left empty")
    }
    else if(username === "admin" && password !== 'password'){
      Alert.alert("Please recheck your password")
    }
    else if(username !== "admin"){
      Alert.alert("The user is not registered")
    }
    else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  const handleSignUp = () => {
    setIsSignUp(true);
  }

  const handleSignUpSuccess = () => {
    setIsSignUp(false);
  }

  return (
    <NavigationContainer>
    <View style = {{flex : 3}}>
      {isLoggedIn ? (
        <View>
          <LiveScores onLogout={handleLogout} />
        </View>
      ) : (
        <LoginPage
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          onLogin={handleLogin}
          error={error}
          handleSignUp = {handleSignUp}
        />
      )}
    </View>
    </NavigationContainer>
  );
}

