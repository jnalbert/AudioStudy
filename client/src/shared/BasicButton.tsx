import React, { FC } from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from "styled-components/native"
import { Primary } from './color';

const TouchableButtonWrapper = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 327px;
  background-color: ${Primary};
  border-radius: 8px;
  align-items: center;
  height: 56px;
`


const ButtonText = styled.Text`
  color: #FFFFFF;
  text-align: center;
  font-family: "Inter_500Medium";
  font-size: 16px;
`
const PaddedView = styled.View`
  padding: 11px 0px;
`

interface BasicButtonProps {
  title: string
  onPress: () => void;
  style?: {};
}
const BasicButton: FC<BasicButtonProps> = ({title, onPress, style}) => {
  return (
    <PaddedView>
      <TouchableButtonWrapper style={style} onPress={onPress}>
        <ButtonText>{title}</ButtonText>
      </TouchableButtonWrapper>
    </PaddedView>
    
  )
}

export default BasicButton