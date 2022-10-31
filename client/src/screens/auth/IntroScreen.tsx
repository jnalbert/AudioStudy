import React, { FC } from 'react';
import { Button, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Primary } from '../../shared/color';
import { Header3, HeaderImage, ImageWrapper, Header2Light, ImageWrapper2, Header3Second, AuthButtonsWrapper } from '../../styles/authStyles/IntroScreenStyles';
import BasicButton from "../../shared/BasicButton"
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import styled from 'styled-components/native';


interface IntroScreenProps {
  navigation: any
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: 410,
    resizeMode: "contain"
  }
})
const TextWrap = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  margin: 0px 0px;
`


const IntroScreen: FC<IntroScreenProps> = ({ navigation }) => {

  
  return (
    <TextWrap>
      <ScrollView>
        <ImageWrapper>
          <HeaderImage style={ styles.image} resizeMethod="resize" source={ require("../../../assets/FullLogo.png")}/>
        </ImageWrapper>
        <Header3>
          Improve the effectiveness of studying through audio
        </Header3>
        <Header2Light>
          There is no need to read long laborious texts anymore
        </Header2Light>
        <ImageWrapper2>
          <Image style={ styles.image} source={require("../../../assets/TextBookCrossedOut.jpeg")} />
        </ImageWrapper2>
       
        <Header3Second>
          You can simply just take a picture and have it read to you
        </Header3Second>

        <AuthButtonsWrapper>

          <BasicButton onPress={() => navigation.navigate("Sign Up")} title="Sign Up" />
            <BasicButton onPress={() => navigation.navigate("Login")} title="Login" />
            <BasicButton onPress={() => navigation.navigate("Guest")} title="Guest" />

        </AuthButtonsWrapper>
        </ScrollView>
        </TextWrap>
  )
}

export default IntroScreen