import React, { FC } from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components/native'


export const HeaderContainer = styled.View`
  height: 88px;
  padding-top: 35px;
 
`

export const HeaderText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1px;
`

interface StackHeaderProps {
  name: string;
}

const StackHeader: FC<StackHeaderProps> = ({name}) => {

  return (
    <HeaderContainer>
      <HeaderText>{name}</HeaderText> 
    </HeaderContainer>
  )
}

export default StackHeader