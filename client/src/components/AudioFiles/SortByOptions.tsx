import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import styled from "styled-components/native"
import Svg, { Line, Circle } from 'react-native-svg'
import { Secondary, Text100 } from '../../shared/color';

const SortIconWrapper = styled.View`
  height: 45px;
  width: 40px;
  background: ${Text100};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`

const SortOptionsWrapper = styled.View` 
  padding-left: 14px;
`

const SortByOptions: FC = () => {
  
  // make show menu
  const showMenu = () => {

  }

  return (
    <SortOptionsWrapper>
      <TouchableOpacity onPress={showMenu}>
        <SortIconWrapper>
          <Svg width="22" height="19" viewBox="0 0 22 19" fill="none" >
            <Line x1="8" y1="4" x2="18" y2="4" stroke={Secondary} stroke-width="3" stroke-linecap="round"/>
            <Circle cx="4" cy="4" r="3.5" stroke={Secondary}/>
            <Line x1="11" y1="12" x2="1" y2="12" stroke={Secondary} stroke-width="3" stroke-linecap="round"/>
            <Circle cx="15" cy="12" r="3.5" transform="rotate(-180 15 12)" stroke={Secondary}/>
          </Svg>
        </SortIconWrapper>
      </TouchableOpacity>
    </SortOptionsWrapper>
  )
}

export default SortByOptions