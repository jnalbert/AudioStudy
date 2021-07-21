import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
import { MaterialIcons } from '@expo/vector-icons'; 

const StyledView = styled.View`
  padding-left: 20px;
  padding-top: 8px;
`

const StackHeaderBackButton: FC = ({}) => {
  return (
    <StyledView>
      <MaterialIcons name="keyboard-backspace" size={24} color="black" />
    </StyledView>
    
  )
}

export default StackHeaderBackButton