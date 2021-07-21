import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { CenterView } from '../../styles/AppStyles';

interface LoginScreenProps {
  route: any
}

const LoginScreen: FC<LoginScreenProps> = ({ route }) => {
  
  const {name} = route.params
  return (
    <CenterView>
      <Text>This is the login Screen</Text>
      <Text>Hello I am {name} Best</Text>
      
    </CenterView>
  )
}

export default LoginScreen