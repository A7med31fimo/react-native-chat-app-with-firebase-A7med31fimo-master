import { onAuthStateChanged } from "firebase/auth";
import CitiesList from "./Components/Cities/CitiesList";
import Login from "./Components/Users/Login";
import Register from "./Components/Users/Register";
import { auth } from "./db/Config";
import { useState, useEffect } from "react";
 import Cities from "./Components/Cities/Cities";
// import GuessMyNumber from "./Components/GuessMyNumber";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {View,Text,Button} from "react-native"
export default function App() {

  const Stack = createNativeStackNavigator();
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setUser(user));

    return () => {
      unsub();
    };
  }, []);
function LogOrSign({navigation}){
return(
  <View>
    <View style={{padding:20}}>
    <Button title="Log In " onPress={()=>{ navigation.navigate('Log In')}}/>
    </View>
    <View style={{padding:20}}>
    <Button  title="Register" onPress={()=>{ navigation.navigate('Register')}}/>
    </View>
  </View>

);
}
  const [user, setUser] = useState(undefined);
  return (
 
<NavigationContainer>

      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={LogOrSign}           
          options={{ title: 'My Chat App' }} />
          <Stack.Screen name="chat" component={CitiesList} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Log In" component={Login} />
        
      </Stack.Navigator> 
    </NavigationContainer>
    // user ? <CitiesList /> : <Register />
    // // <Cities />
  );
}
