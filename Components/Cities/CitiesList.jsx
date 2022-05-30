import { View, Text, Button, TextInput ,KeyboardAvoidingView,li} from "react-native";
import { useEffect, useState } from "react";
import {
  getCities,
  addCity,
  deleteCity,
  subscribe,
} from "../../db/cities/cities";
import EditCity from "./EditCity";
import { ScrollView } from "react-native-web";

const CitiesList = () => {
  const getCitiesList = async () => {
    const c = await getCities();
    setCities(c);
    console.log("cities", c);
  };

  useEffect(() => {
    getCitiesList();
  }, []);
  useEffect(() => {
    const unsubscribe = subscribe(({ change, snapshot }) => {
    
      if (change.type === "added") {
        console.log("New city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "modified") {
        console.log("Modified city: ", change.doc.data());
        getCitiesList();
      }
      if (change.type === "removed") {
        console.log("Removed city: ", change.doc.data());
        getCitiesList();
      }
       
         
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [cities, setCities] = useState([]);
  const [cityName, setCityName] = useState("");
  const [cityToEdit, setCityToEdit] = useState(undefined);

  return cityToEdit ? (
    <EditCity city={cityToEdit} onSave={()=>setCityToEdit(undefined)} />
  ) : (
    <View>
      <View>
        <ScrollView >
           
              {cities.map((c) => (
                  
                    <View key={c.id}>
                        <Text
                          onPress={() => {

                            setCityToEdit(c);
                            console.log('cityToEdit', c);
                          }}
                        >
                          {c.name}
                        </Text>
                        <Button title="Delete" onPress={() =>  deleteCity(c.id)} />
                        </View>
            
              ))}
               </ScrollView> 
              </View>
              <View>
             
       <View
        style={{position: 'absolute',
        
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'}}
      >
        <TextInput
          onChangeText={setCityName}
          style={{ flex: 1, borderColor: "black", borderWidth: 2 }}
        />
        <Button
          title="Send"
          onPress={() =>
            addCity({ name: cityName || "new city" + cities.length })
          }
        />

      </View>

      
       </View>
    </View>
  );
};

export default CitiesList;
