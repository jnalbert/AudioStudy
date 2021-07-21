import React, { FC } from 'react';
import { Button, Text } from 'react-native';
import { CenterView, ScreenText } from '../../styles/AppStyles';

interface IntroScreenProps {
  navigation: any
}

const IntroScreen: FC<IntroScreenProps> = ({navigation}) => {
  return (
    <CenterView>
      <ScreenText >This is the home screen</ScreenText>
      <Button title="Go to the Login Screen" onPress={() => navigation.navigate("Login", {name: "justin"}) } />
    </CenterView>
  )
}

export default IntroScreen