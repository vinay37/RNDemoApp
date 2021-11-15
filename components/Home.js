import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView, CheckBox} from 'react-native';
import { Button } from 'react-native-elements';
import auth from '@react-native-firebase/auth';
import firebaseConfig from '@react-native-firebase/app';
import database from '@react-native-firebase/database';

export default function Home({ navigation }) {

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();
    const [itemsArray, setItemsArray] = useState([]);


    function onAuthStateChanged(user) {
        setUser(user);
        if (initializing) setInitializing(false);
    }
     
    useEffect(() => {
               
        const firebConfig = {
            apiKey: "AIzaSyCJv8FoNE3l3JNOqbGA203SJIsnDydVas8",
            authDomain: "rndemoapp-15d50.firebaseapp.com",
            databaseURL: "https://rndemoapp-15d50-default-rtdb.firebaseio.com",
            projectId: "rndemoapp-15d50",
            storageBucket: "gs://rndemoapp-15d50.appspot.com",
            messagingSenderId: "606834864054",
            appId: "1:606834864054:android:7a1bbbbf6dddbf09ef1b17",
            //measurementId: "G-measurement-id",
        };

        if (!firebaseConfig.apps.length) {
           const app = firebaseConfig.initializeApp(firebConfig);
        } else {
           firebaseConfig.app("RNDemoApp"); // if already initialized, use that one
        }

        let itemsRef = database().ref('/items');

        itemsRef.on('value', snapshot => {
            let data = snapshot.val();
            const items = Object.values(data);
            setItemsArray(items);
          });


        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;
     
    if (!user) {
        return navigation.navigate('Login');
    }

    const updateItem = (uid, isChecked) => {
        var updates = {};
        updates[uid] = {
            isChecked: isChecked,
        };

        var b = itemsArray.filter(item => {
            return item.uid === uid
          })

        //   var items = itemsArray;
        //   b.isChecked = isChecked;

        var items = itemsArray.map(el => (el.uid === uid ? Object.assign({}, el, { isChecked }) : el))

          setItemsArray(items);

        return database().ref('/items').update(updates);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.subContainer}>
                <Button
                    style={[styles.textInput]}
                    title="Add Item"
                    onPress={() => { navigation.navigate('AddItem') }} />
              
            </View>

            <FlatList
                data={itemsArray}
                renderItem={({ item }) => (
                    <View style={[styles.item] }>
                        <Text>User ID: {item.uid}</Text>
                        <Text>User Name: {item.name}</Text>

                        <CheckBox
                            value={item.isChecked}
                            //onValueChange={() => {updateItem(item.uid, item.isChecked)}}
                            style={styles.checkbox}
                        />
                    </View>
                )}
            />
       
        </SafeAreaView>
    );
}

Home.navigationOptions = ({ navigation }) => ({
    title: 'Home',
    headerRight: () => <Button
            buttonStyle={{ padding: 0, marginRight: 20, backgroundColor: 'transparent' }}
            title="Sign-out"
            onPress={() => {auth().signOut()}} />,
            
            
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 10,
    },
    item: {
      backgroundColor: '#ADD8E6',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textInput: {
        fontSize: 18,
        margin: 5,
     
    },
    checkbox: {
        alignSelf: "center",
      },
  });