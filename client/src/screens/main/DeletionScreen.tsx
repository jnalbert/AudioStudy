import React, { FC } from 'react';
import { Button, Text, View, Image, StyleSheet, ScrollView } from 'react-native';
import { Primary } from '../../shared/color';
import { Header3, HeaderImage, ImageWrapper, Header2Light, ImageWrapper2, Header3Second, AuthButtonsWrapper } from '../../styles/authStyles/IntroScreenStyles';
import BasicButton from "../../shared/BasicButton"
import ScreenWrapperComp from '../../shared/ScreenWrapperComp';
import styled from 'styled-components/native';


interface DeletionProp {
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


const DeletionScreen: FC<DeletionProp> = ({ navigation }) => {

    const deleteAccount = () => {
        navigation.navigate("Settings")
        /*   add deletion code idk 
        just make sure that they see that their name has been wiped off
        */
      }
  return (
    <TextWrap>
      <ScrollView>
        <ImageWrapper>
          <HeaderImage style={ styles.image} resizeMethod="resize" source={ require("../../../assets/FullLogo.png")}/>
        </ImageWrapper>
        <Header3>
        Are you sure you want to permanently delete your account? This action cannot be reversed. All files and progress will be lost.  
        </Header3>
       
        <AuthButtonsWrapper>

          <BasicButton onPress={() => navigation.navigate("Settings")} title="No :)" />
            <BasicButton onPress={deleteAccount} title="Yes :(" />

        </AuthButtonsWrapper>
        </ScrollView>
        </TextWrap>
  )
}

export default DeletionScreen