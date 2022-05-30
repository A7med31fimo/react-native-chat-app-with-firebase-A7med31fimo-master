import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { login } from "../../db/auth/auth";
import Register from "./Register";
import CitiesList from "../Cities/CitiesList";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../db/Config";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
export default function Login  ({navigation}){
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Text style={{ flex: 1 }}>Email:</Text>
        <TextInput
          onChangeText={setEmail}
          keyboardType="email-address"
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
        }}
      >
        <Text style={{ flex: 1 }}>Password:</Text>
        <TextInput
          onChangeText={setpassword}
          keyboardType="visible-password"
          secureTextEntry={true}
          style={{ flex: 2, borderColor: "black", borderWidth: 2 }}
        />
      </View>
      <View>
        <Button
          title="Login"
          onPress={() => {
            console.log(email, password);
            login(email,password)   
              .then(
              ()=> { navigation.navigate('chat')} 
              )
              .catch((e) => setError(e.message));
          }
        
        }
        />
        <Text>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
