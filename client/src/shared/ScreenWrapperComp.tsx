import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"
import { backgroundColor } from './color';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${backgroundColor};
  flex-direction: column;
  align-items: center;
  margin: 0px 24px;
`


export const ScreenBackgroundColor = styled.View`
  background-color: ${backgroundColor};
  flex: 1;
`

interface ScreenWrapperCompProps {
  children: React.ReactNode;
}

const ScreenWrapperComp: FC<ScreenWrapperCompProps> = ({children}) => {
  return (
    <ScreenBackgroundColor>
      <ScreenWrapper>
        {children}
      </ScreenWrapper>
    </ScreenBackgroundColor>
      
  )
}

export default ScreenWrapperComp