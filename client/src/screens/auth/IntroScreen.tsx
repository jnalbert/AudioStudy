import React, { FC } from 'react';
import { Button, Text, View, Image, StyleSheet } from 'react-native';
import { Primary } from '../../shared/color';
import { ScreenWrapper, ScreenBackgroundColor } from '../../shared/sharedStyles';
import { CenterWrapper, Header3, HeaderImage, ImageWrapper, Header2Light, ImageWrapper2, Header3Second, AuthButtonsWrapper } from '../../styles/authStyles/IntroScreenStyles';
import BasicButton from "../../shared/BasicButton"


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

const IntroScreen: FC<IntroScreenProps> = ({ navigation }) => {

  
  return (
    <ScreenBackgroundColor>
     <ScreenWrapper>
      <CenterWrapper>
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

          <BasicButton onPress={() => navigation.navigate("Sign Up", {name: "Justin Albert"})} title="Sign Up" />
            <BasicButton onPress={() => navigation.navigate("Login", { name: "Justin Albert" })} title="Login" />
            
        </AuthButtonsWrapper>
      </CenterWrapper>
      </ScreenWrapper>
    </ScreenBackgroundColor>
    
  )
}

export default IntroScreen