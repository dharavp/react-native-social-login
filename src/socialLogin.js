const FBSDK = require('react-native-fbsdk');
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
const {
    LoginButton,
    LoginManager,
    GraphRequest,
    GraphRequestManager,
    FBSDKGraphRequest,
} = FBSDK;

class socialLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            name: ''
        }
    }
    onFbLogin() {
        LoginManager.logOut();
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
            .then(
                function (result) {
                    if (result.isCancelled) {
                        alert('Login was cancelled');
                    }
                    else {
                        this.getFacebookData()
                    }
                }.bind(this),
                function (error) {
                    alert('Login failed with error: ' + error);
                }
            );
    }
    getFacebookData() {
        var fetchProfileRequest = new GraphRequest('/me', {
            parameters: {
                fields: {
                    string: 'email,name,first_name,middle_name,last_name,gender,id' // what you want to get
                },
            }
        },
            (error, result) => {
                console.log('str');
                if (error) {
                    alert('Error making request.');
                } else {
                    // Data from request is in result
                    console.log(result);
                    console.log(result.id);
                    console.log(result.email);
                  //  LoginManager.logOut();
                    alert(`name: ${result.name} email: ${result.email}`);
                }
            });
        new GraphRequestManager().addRequest(fetchProfileRequest).start();
    }
    render() {
        const { textStyle, buttonStyle } = styles;
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <TouchableOpacity activeOpacity={0.8} onPress={this.onFbLogin.bind(this)} style={buttonStyle}>
                    <Text style={textStyle}>Facebook Login</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
const styles = {
    textStyle: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 14,
        fontWeight: '700'
    },
    buttonStyle: {
        alignSelf: 'stretch',
        borderRadius: 2,
        borderWidth: 1,
        borderColor: 'black',
        height: 30,
        padding: 10,
        marginLeft: 30,
        marginRight: 30,
        backgroundColor: '#ffffff',
        justifyContent: 'center'
    }
};
export default socialLogin;