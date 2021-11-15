import React from 'react';
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    TextInput,
    Alert,
} from 'react-native';
import { Button, Input } from 'react-native-elements';
import database from '@react-native-firebase/database';

let addItem = item => {
    database().ref('/items').push({
        uid: Date.now(),
        name: item,
        isChecked: false,
    });
};

export default function AddItem({ navigation }) {
    const [name, onChangeText] = React.useState('');

    const handleSubmit = () => {
        if(name == null || name == undefined  || name == '') {
            Alert.alert("",
                "please enter name item!"
            );
        } else {
            addItem(name);
            Alert.alert('', 'Item saved successfully',
            [  
                  
                {text: 'OK', onPress: () => navigation.navigate('Home')},  
            ]  
           );
        }
    };

    return (
        <View style={styles.main}>
            <Text style={styles.title}>Add Item</Text>
            <View style={styles.subContainer}>
                <Input
                    style={styles.textInput}
                    placeholder='Item Name'
                    onChangeText={text => onChangeText(text)}
                />
            </View>
            <View style={styles.subContainer}>
                <Button
                    style={styles.textInput}
                    title="Add"
                    onPress={handleSubmit} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
    },

    textInput: {
        fontSize: 18,
        margin: 5,
        width: '100%'
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
        width: '100%'
    },
});