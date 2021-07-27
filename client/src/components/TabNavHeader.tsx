import React, { FC } from 'react';
import { View, SafeAreaView } from 'react-native';
import styled from "styled-components/native"
import { Text500 } from '../shared/color';


const HeaderWrapper = styled.View`
  padding-top: 60px;
  height: 88px;
  justify-content: center;
`

const HeaderText = styled.Text`
  font-family: "Inter_500Medium";
  font-size: 20px;
  line-height: 28px;
  text-align: center;
  letter-spacing: -1px;
  color: ${Text500};
  font-weight: 500;
`


interface TabNavHeaderProps {
  title: string;
}

const TabNavHeader: FC<TabNavHeaderProps> = ({title}) => {
  return (
    <HeaderWrapper>
      <HeaderText>{title}</HeaderText>
    </HeaderWrapper>

  )
}

export default TabNavHeader