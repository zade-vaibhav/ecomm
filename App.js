import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import Home from './Components/Home/Home';
import Onbord from './Components/Onbording/Onbord';
import Login from './Components/Login/Login';
import Registration from './Components/Registration/Registration';


const Stack = createStackNavigator();

function App() {
  return (
   
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "white",
            height: 30,
          }
        }}>
        <Stack.Screen name="Onbord" component={Onbord}  options={{headerShown:false}} />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;