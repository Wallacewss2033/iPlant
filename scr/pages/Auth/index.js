/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Alert,
  TextInput,
  TouchableOpacity,
  Platform,
  AsyncStorage,
  Image,

} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../../services/api';
import { ImageBackground } from 'react-native';

export default class App extends Component {


  
  state = {

    UserName: null,
    UserPassword: null,

    erroMessenger: null,
    loggedUser: null,
    projects: [],

  }


  teste = async () => {
    this.setState({ loggedUser: null, UserName: null, project: null, });
    AsyncStorage.clear();
  }

  getProjectList = async () => {
    try {


      const response = await api.get('/api/users');

      const projects = response.data;

      this.setState({ projects });


    } catch (err) {
      this.setState({
        erroMessenger: err.data.error,
        loggedUser: null,
      });
      alert(this.state.erroMessenger);
    }

  };

  signIn = async () => {

    //const UserName = this.state.UserName;
    //const UserPassword = this.state.UserPassword;

    try {
      const response = await api.post('/api/auth/login', {
        email: 'wallace@hotmail.com',
        password: '123456',
      });

      const { user, token } = response.data;
      //const toke = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC8xOTIuMTY4LjEuMTE0OjgwMDBcL2FwaVwvYXV0aFwvbG9naW4iLCJpYXQiOjE1OTUyNzYxODYsImV4cCI6MTU5NTI3OTc4NiwibmJmIjoxNTk1Mjc2MTg2LCJqdGkiOiJCdDRGT0llYzJ1REZhZzlaIiwic3ViIjoxLCJwcnYiOiI4N2UwYWYxZWY5ZmQxNTgxMmZkZWM5NzE1M2ExNGUwYjA0NzU0NmFhIn0.2QViOXRk4yxpkfUq69lj0rdxF3Tj0C-zmpEBWN3kW_I';
      await AsyncStorage.multiSet([
        ['@CodeApi:token', toke],
        ['@CodeApi:user', JSON.stringify(user)],
      ]);

      this.setState({ loggedUser: user });
      Alert.alert('Login realizado com sucesso!',
        'Parabéns, você entrou no futuro melhor aplicativo de agronegocio',
      );


    } catch (response) {

      this.setState({
        erroMessenger: response.data.error
      });
      alert(erroMessenger);


    }

  };

  async componentDidMount() {
    const token = await AsyncStorage.getItem('@CodeApi:token');
    const user = JSON.parse(await AsyncStorage.getItem('@CodeApi:user'));
    if (token && user) {
      this.setState({ loggedUser: user });
    }
  }



  render() {
    return (

      <View>

        <View>
          <Image style={styles.image} source={require('../../images/logo-b.png')}
            style={{ width: 393, height: 306 }} />
        </View>

        {!!this.state.loggedUser && <Text>{this.state.loggedUser.name}</Text>}
        <View style={styles.containerin}>

          {!this.state.loggedUser &&
            <View>
              {this.state.UserName
                ?
                <View style={styles.Section}>
                  <Icon style={styles.Icon} name="user" size={25} color="#000" />
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={UserName => this.setState({ UserName })}
                    underlineColorAndroid='transparent'
                    value={this.state.UserName}

                  />
                </View>
                :
                <View style={styles.Section}>
                  <Icon style={styles.Icon} name="user" size={25} color="#000" />
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    onChangeText={UserName => this.setState({ UserName })}
                    underlineColorAndroid='transparent'


                  />
                </View>
              }


              <View style={styles.Section}>
                <Icon style={styles.Icon} name="lock" size={25} color="#000" />
                <TextInput
                  style={styles.input}
                  placeholder="Password"
                  onChangeText={(searchString) => { this.setState({ searchString }) }}
                  underlineColorAndroid="transparent"
                />
              </View>



              <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} style={styles.Btn} onPress={this.signIn}>
                <Text style={styles.btnText}>Entrar</Text>
              </TouchableOpacity>

              <View style={styles.line}>

                <TouchableOpacity style={styles.btnfacebook} activeOpacity={0.4}>
                  <View style={styles.logoface}>
                    <Icon style={styles.iconface} name="facebook" size={25} color="#000" />
                  </View>
                  <Text style={styles.textbtnlogin}>Logar com facebook</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btngoogle} activeOpacity={0.8}>
                  <View style={styles.line}>
                    <Icon style={styles.icongoogle} name="google" size={25} color="#000" />
                    <Icon style={styles.icongoogle} name="plus" size={10} color="#000" />
                  </View>
                  <Text style={styles.textbtnlogin}>Logar com Gooogle</Text>
                </TouchableOpacity>

              </View>


            </View>
          }
          {!!this.state.loggedUser &&
            <View>
              <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} style={styles.Btn} onPress={this.getProjectList}>
                <Text style={styles.btnText}>Gerar Culturas</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={this.state.disabled} activeOpacity={0.8} style={styles.Btn} onPress={this.teste}>
                <Text style={styles.btnText}>Sair</Text>
              </TouchableOpacity>
            </View>
          }
          {!!this.state.projects &&
            <View>


              {this.state.projects.map(project => (
                <View key={project.id} style={{ marginTop: 15 }}>
                  <Text style={{ fontWeight: 'bold' }}>{project.name}</Text>
                  <Text>{project.email}</Text>
                </View>
              ))}
            </View>
          }
        </View>
      </View >
    );
  }
}
const styles = StyleSheet.create({
  line: {
    flexDirection: 'row',

  },
  textbtnlogin: {
    color: 'white',
    paddingLeft: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  iconface: {
    textAlign: 'center',
    color: '#3b5998',
  },
  icongoogle: {
    color: 'white',
  },
  logoface: {
    backgroundColor: 'white',
    width: 30,
    padding: 3,
    borderRadius: 3,
  },
  btnfacebook: {
    backgroundColor: '#3b5998',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  btngoogle: {
    backgroundColor: '#dd4b39',
    flexDirection: 'row',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',

  },
  Section: {
    margin: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    padding: 0.3,
    borderColor: 'green',
  },
  Icon: {
    padding: 5,
    paddingRight: 10,
    color: 'green',
  },
  input: {
    borderTopRightRadius: 30,
    borderBottomRightRadius: 30,
    flex: 1,
    backgroundColor: 'transparent',
    color: 'green',

  },
  containerin:
  {

    borderRadius: 10,
    justifyContent: 'center',
    //alignItems: 'center',
    backgroundColor: 'transparent',
    borderColor: '#000',
    margin: 5,
    marginTop: 30,
    padding: 5,
    //paddingTop: (Platform.OS == 'ios') ? 20 : 0
  },
  image:
  {
    marginTop: 0,
    flex: 1,

  },

  Btn:
  {
    backgroundColor: 'transparent',
    alignSelf: 'stretch',
    padding: 10,
    marginTop: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'green',
  },

  btnText:
  {
    textAlign: 'center',
    color: 'green',
    fontSize: 16
  },

  textAlrt:
  {
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },





});
//export default App;
