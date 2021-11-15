import React, { useState, useEffect } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, Alert, BackHandler } from 'react-native';
import { Button, Input } from 'react-native-elements';
import auth from '@react-native-firebase/auth';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    
    const login = async() => {
        
        try {
            if(email == null || email == undefined  || email == '') {
                Alert.alert("",
                    "please enter email!"
                );
            } else if(password == null || password == undefined  || password == '') {
                Alert.alert( "",
                    "please enter password!"
                );
            } else {
                setShowLoading(true);
                const doLogin = await auth().signInWithEmailAndPassword(email, password);
                setShowLoading(false);
                if(doLogin.user) {
                    navigation.navigate('Home');
                }
            }
            
        } catch (e) {
            setShowLoading(false);
            Alert.alert("",
                e.message
            );
        }
    };


    function handleBackButtonClick() {
        //navigation.goBack();
        BackHandler.exitApp();
        return true;
      }
    
      useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => {
          BackHandler.removeEventListener('hardwareBackPress', handleBackButtonClick);
        };
      }, []);


    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={{ fontSize: 28, height: 100  }}>Please Login!</Text>
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder='Email'
                        
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Input
                        style={styles.textInput}
                        placeholder='Password'
                    
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                        
                        title="Login"
                        onPress={() => login()} />
                </View>
               
                
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Not a user?</Text>
                </View>
                <View style={styles.subContainer}>
                    <Button
                        style={styles.textInput}
                        
                        title="Register"
                        onPress={() => {
                            navigation.navigate('Register');
                        }} />
                </View>
                {showLoading &&
                    <View style={styles.activity}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>
                }
            </View>
        </View>
    );
}

Login.navigationOptions = ({ navigation }) => ({
    title: 'Login',
    headerShown: false,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    formContainer: {
        height: 400,
        padding: 10,
        width: "100%"
    },
    subContainer: {
        marginBottom: 20,
        padding: 5,
        width: "100%"
    },
    activity: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        fontSize: 18,
        margin: 5,
        width: "80%"
    },
})