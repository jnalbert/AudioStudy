import React, { FC, useContext } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import BasicButton from './BasicButton';
import { Black } from './color';
import { AuthContext } from '../AppContext';
import { AuthButtonsWrapper } from '../styles/authStyles/IntroScreenStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import SignUpScreen from '../screens/auth/SignUpScreen';
import LoginScreen from '../screens/auth/LoginScreen';

const OverallWrapper = styled.View`
  height: 100%;
  width: 100%;
  padding-top: 37%;
  alignItems: center;
`

const HeaderText = styled.Text`
  color: ${Black};
  font-size: 35px;
  line-height: 48px;
  letter-spacing: -1.5px;
  text-align: center;
`

const SubHeaderWrapper = styled.View`
  width: 75%;
`

const SubHeaderText = styled.Text`
  margin-top: 28px;
  color: ${Black};
  font-size: 27px;
  line-height: 40px;
  /* or 148% */

  text-align: center;
  letter-spacing: -1.5px;
`

const ButtonWrapper = styled.View`
  margin-top: 5%;
  width: 80%;
  align-self: center;
`
interface IsProtectedProp {
    navigation: any
  }
  

const IsProtectedComp: FC<IsProtectedProp> = ({ navigation }) => {

  const { signOut } = useContext(AuthContext);

  const signOutPress = () => {
    signOut()
  }
  const Stack = createStackNavigator();


  return (
    <OverallWrapper>

      <HeaderText>You must be signed in</HeaderText>
      <SubHeaderWrapper>
        <SubHeaderText>
          This page requires an account 
        </SubHeaderText>

        <SubHeaderText style={{fontSize: 24}}>
          Please create one or sign in
        </SubHeaderText>
      </SubHeaderWrapper>

      <AuthButtonsWrapper>

            <BasicButton onPress={() => navigation.navigate("Sign Up")} title="Sign Up" />
            
            <BasicButton onPress={() => navigation.navigate("Login")} title="Login" />

     </AuthButtonsWrapper>
     
    </OverallWrapper>
    // I have no idea how to do the onpress thing.
  )

}

export default IsProtectedComp