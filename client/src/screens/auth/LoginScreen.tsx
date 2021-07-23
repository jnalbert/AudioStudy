import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { CenterView } from '../../styles/AppStyles';

interface LoginScreenProps {
  
}

const LoginScreen: FC<LoginScreenProps> = () => {
  
  return (
    <CenterView>
      <Text>This is the login Screen</Text>
      <Text>Hello I am  Best</Text>
      
    </CenterView>
  )
}

export default LoginScreen