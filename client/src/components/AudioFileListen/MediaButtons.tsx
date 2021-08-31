import React, { FC } from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import styled from "styled-components/native"

import { FontAwesome } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons'; 

const MediaButtonsWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 60%;
  margin-top: 40px;
`

const MediaButton = styled.View`
  justify-content: center;
  align-items: center;
  padding-left: auto;
  padding-right: auto;
`

interface MediaButtonsProps {
  isPaused: boolean;
  onPressMainButton: () => void;
  traverse: (amount: number) => void;
}

const MediaButtons: FC<MediaButtonsProps> = ({isPaused, onPressMainButton, traverse}) => {
  return (
    <MediaButtonsWrapper>
      <MediaButton>
        <TouchableOpacity onPress={() => traverse(-10)}>
          <Image source={require("../../../assets/replay-10.png")} />
        </TouchableOpacity>
      </MediaButton>

      <MediaButton>
        <TouchableOpacity onPress={onPressMainButton}>
          {isPaused ? <FontAwesome style={{ transform: [{ translateX: 4 }]}} name="play" size={40} color="black" /> : <Fontisto name="pause" size={33} color="black" />}
        </TouchableOpacity>
      </MediaButton>

      <MediaButton>
        <TouchableOpacity  onPress={() => traverse(10)}>
          <Image source={require("../../../assets/forward-10.png")} />
        </TouchableOpacity>
      </MediaButton>
    </MediaButtonsWrapper>
  )
}

export default MediaButtons