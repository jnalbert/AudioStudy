import React, { FC } from 'react';
import { View } from 'react-native';
import styled from "styled-components/native"

const HeaderWrapper = styled.View`

`

const HeaderText = styled.Text`

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