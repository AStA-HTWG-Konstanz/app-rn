import React, { Component } from 'react';
import {Text, View, TextInput, TouchableOpacity, Image} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-checkbox';
import Toast from 'react-native-simple-toast';

import { ActionCreators } from 'src/actions';
import { styles } from './styles';
import { strings } from 'src/i18n';
import connector from 'src/backend_connection';
import {login_logo_white} from 'src/images';

class Login extends Component{
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (connector.getConnectionStatus() === false) {  // true, false, undefined <- undefined, if still fetching status
            Toast.show(strings('general.notConnectedText'), Toast.LONG);
        }
    }

    render() {
        return (
            <View style={styles.page}>
                <Image style={styles.image}
                    source={login_logo_white}
                />

                <TextInput
                    style={styles.input}
                       value={this.props.username ? this.props.username : ''}
                       placeholder={strings('login.username')}
                       underlineColorAndroid='transparent'
                       placeholderTextColor='#999595'
                       onChangeText={(text) => {this.props.actions.changeUsername(text)}}
                />
                <TextInput
                    secureTextEntry={true}
                       style={styles.input}
                       value={this.props.password ? this.props.password : ''}
                       placeholder={strings('login.password')}
                       placeholderTextColor='#999595'
                       onChangeText={(text) => {this.props.actions.changePassword(text)}}
                />

                <View style={styles.placeholderLogin}/>

                <View style={styles.switcher}>
                    <CheckBox
                        onChange={(value) => this.props.actions.changeRememberMe(!value)}
                        checked = { this.props.rememberMe }
                        label={strings("login.remember")}
                        labelStyle = { {
                                color: 'white',
                                fontSize: 18,
                                fontFamily: 'Swiss721',
                                fontWeight: '100'
                            }
                        }
                    />
                </View>

                <TouchableOpacity
                    onPress={() => {
                        this.props.actions.login();
                    }}
                    style={styles.submitBtn}>
                   <Text style={styles.submitText}>{strings('login.signin')}</Text>
                </TouchableOpacity>

            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    username    : state.loginReducer.username,
    password    : state.loginReducer.password,
    rememberMe  : state.loginReducer.rememberMe
});

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(ActionCreators, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
